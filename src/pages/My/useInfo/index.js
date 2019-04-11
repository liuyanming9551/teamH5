import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace, Carousel, Modal, Toast } from 'antd-mobile';
import {Map} from "immutable";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import "./index.less";
import {actionCreators} from "../store";
import {baseUrl} from "../../../request";
const alert = Modal.alert;
class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgHeight: 100,
            modal: false,
        }
    }

    componentDidMount() {
        const {userCode} = this.props;
        // simulate img loading

        this.props.getUserInfo(userCode)

    }
    changeDetailInfo = () =>{
        const {history} = this.props;
        history.push('/my/changeDetail');
    }

    // 确认删除
    confirmDelete = (v) => {
        const {userCode} = this.props;
        const data = {
            EvaluateCode: v
        }
        this.props.deleteEvaluate(data, (res) => {
            if (res) {
                Toast.success('删除成功', 1)
            } else {
                Toast.fail('删除失败', 1)
            }
            this.props.getUserInfo(userCode)
        })
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render() {
        const {userInformation,userModel,cardInfo} = this.props;
        let honorImgData = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7']
        let map = Map(userModel);
        let userInformationData = '';
        let userSkills = [];
        let cardList = '';
        let cardInfoData = '';
        let badge = '';
        let EvaluateList = [];

        if(cardInfo){
            cardInfoData = Map(cardInfo);
            let cardToArray = cardInfoData.get('SportsStatistics');
            cardList = cardToArray.toJS();
        }

        if(userInformation){
            userInformationData = userInformation.toJS();
            userSkills = userInformationData.UserSkill?userInformationData.UserSkill.split(','):'';
            EvaluateList = userInformationData.EvaluateList;
            badge = userInformationData.Badge;
        }

        return (
            <div className="userInnerWrap">
                <header className="userInner">
                    <div className="userImg">
                        <img src={map.get("avatar")} />
                    </div>
                    <div className="userLabel">
                        <div className="userName">{userInformationData.UserName}</div>
                        <div className="userTitle">{map.get("position")}</div>
                        <div className="company">{userInformationData.GroupName}</div>
                    </div>
                    <div className='changeDetail' onClick={this.changeDetailInfo}>修改资料</div>
                </header>
                <footer className="ownDesc">
                    <WingBlank size="md">
                        <WhiteSpace size="md" />
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    自我介绍
                                </div>
                                <div className="evaluateBox">
                                    {userInformationData.UserSign}
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    个人技能
                                </div>
                                <div className='evaluateBox'>
                                    {
                                        userSkills?userSkills.map((item,index)=>{
                                            return (
                                                <span key={index} className="skill">{item}</span>
                                            )
                                        }):''
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    他人评价
                                </div>
                                <div className='evaluateBox'>
                                    {
                                        EvaluateList.map((item, index) => {
                                            return (
                                                <span className='skill' key={index}>
                                                    <i> {item.EvaluateContent} ({item.LikeNum}) </i>
                                                    <b 
                                                        className="iconfont icon-shanchu1"  
                                                        onClick={() =>
                                                            alert('是否删除？', '', [
                                                                { text: '取消'},
                                                                { text: '确定', onPress: () => {this.confirmDelete(item.EvaluateCode)} },
                                                            ])
                                                        }
                                                    ></b>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    本周排名
                                </div>
                                <div className='evaluateBox'>
                                    <span className="rankTitle">排名：</span>
                                    <span className="rank">第{cardInfoData?(cardInfoData.get('RankingThisWeek')>0?cardInfoData.get('RankingThisWeek'):'--'):'--'}名</span>
                                    <WhiteSpace size="sm" />
                                    <Carousel className="space-carousel"
                                              frameOverflow="visible"
                                              cellSpacing={10}
                                              slideWidth="150px"
                                              autoplay={false}
                                              dots={false}
                                              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                              afterChange={index => this.setState({ slideIndex: index })}
                                    >
                                        {cardList?cardList.map((val, index) => (
                                            <a
                                                key={val}
                                                style={{
                                                    display: 'block',
                                                    position: 'relative',
                                                    top: this.state.slideIndex === index ? -10 : 0,
                                                    height: this.state.imgHeight,
                                                    borderRadius:"4px",
                                                    background:"#f6f6f64f",
                                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                                <div  className="cardItem"

                                                      style={{ width: '150px', verticalAlign: 'top' }}
                                                      onLoad={() => {
                                                          // fire window resize event to change height
                                                          window.dispatchEvent(new Event('resize'));
                                                          this.setState({ imgHeight: 'auto' });
                                                      }}
                                                >
                                                    <div className="cardDetailWrapInner">
                                                        <div className="cardListTitle">{val.Time}</div>
                                                        <div className="cardDetailWrap">
                                                            <div className="cardDetailMin">{val.Time === '今天'?'':(`运动天数：${val.CountDays}`)}</div>
                                                            <div className="cardDetailNum">运动量：{val.CountRunDistance}km</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </a>
                                        )):''}
                                    </Carousel>
                                </div>

                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    <span>个人季度荣誉等级</span>
                                    <span className="iconfont icon-tishi" onClick={this.showModal('modal')} style={{display: 'inline-block', fontSize: '14px', marginLeft: '10px'}}></span>
                                </div>
                                <div className='evaluateBox'>
                                    <div style={{overflow: "auto"}}>
                                        <div className='honorImgBox'>
                                            {
                                                honorImgData.map((item, i) => {
                                                    return (
                                                        <img key={i} src={`${baseUrl}/termImg/myhonorimg/${item}.png`} style={i+1 <= badge ? { width: (50+ (i*10))+'px', height: (50+ (i*10))+'px'} : {filter: "grayscale(100%)", WebkitFilter: "grayscale(100%)", width: (50+ (i*10))+'px', height: (50+ (i*10))+'px'}} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                </footer>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal')}
                    title="荣誉等级获得条件"
                    footer={[{ text: '关闭', onPress: () => { console.log('ok'); this.onClose('modal')(); } }]}
                    >
                    <div style={{textAlign: 'left', paddingLeft: '20px'}}>
                        青铜等级：20km，PK 1胜 <br />
                        白银等级：50km，PK 3胜 <br />
                        黄金等级：100km，PK 5胜 <br />
                        铂金等级：200km，PK 10胜 <br />
                        钻石等级：270km，PK 20胜 <br />
                        大师等级：360km，PK 26胜 <br />
                        王者等级：500km，PK 35胜 <br />
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    userInformation:state.getIn(['my','userInformation']),
    userModel:state.getIn(['login','userModel']),
    cardInfo:state.getIn(['my','cardInfo']),
    myHonor:state.getIn(['my','myHonor'])
})
const mapDispatch = (dispatch) => ({
    getUserInfo(userCode){
        let param = {
            UserCode:userCode
        }
        let sportParam = {
            Creator:userCode
        }
        dispatch(actionCreators.getUserInformation(param));
        dispatch(actionCreators.getMysportInfo(sportParam));
        dispatch(actionCreators.getMyHonorList(param));
    },
    deleteEvaluate(data, callback) {
        dispatch(actionCreators.deleteEvaluate(data, callback))
    }
})
export default connect(mapState,mapDispatch)(withRouter(UserInfo));