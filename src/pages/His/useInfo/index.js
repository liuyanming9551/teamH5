import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace, Carousel, InputItem, Modal, Toast } from 'antd-mobile';
import {Map} from "immutable";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import "./index.less";
import {actionCreators} from "../store";
import {baseUrl} from "../../../request";
class UserInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgHeight: 100,
            modal: false,
            modalBadge: false,
            evaluateContent: '',
            evaluaterCode: '',
            isEvaluatedCode: '',
        }
    }

    componentDidMount() {
        const dataCode = this.props.match.params.code;
        this.setState({
            isEvaluatedCode: dataCode,
            evaluaterCode: this.props.userCode
        })
        const data = {
            UserCode: dataCode
        }
        const sportData = {
            Creator: dataCode
        }
        this.props.getHisInfo(data);
        this.props.getHisSportData(sportData)
    }

    // 确认删除
    confirmDelete = (index) => {
        console.log("confirmDelete", index)

    }

    // 点击标签，点赞或取消
    onItemClick = (v) => {
        const data = {
            EvaluateCode: v
        }
        const dataCode = this.props.match.params.code;
        const UserCode = {
            UserCode: dataCode
        }
        this.props.addLike(data, (res) => {
            this.props.getHisInfo(UserCode)
            if (res) {
                Toast.success('点赞成功', 1);
            } else {
                Toast.fail('点赞失败', 1);
            }
        })
    }

    onInputChange = (value) => {
        this.setState({
            evaluateContent: value
        })
    }

    // 点击添加评价
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    // 关闭弹窗
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    // 显示荣誉等级弹窗
    showBadgeModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    // 关闭荣誉等级弹窗
    onBadgeClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    // 提交评价
    onSubmit = () => {
        const {isEvaluatedCode, evaluaterCode, evaluateContent} = this.state;
        const {hisInformation} = this.props;
        let hisInfoData = '';
        let evaluateList = [];
        if(hisInformation){
            hisInfoData = hisInformation.toJS();
            evaluateList = hisInfoData.UserTable.EvaluateList;
        }
        const params = {
            EvaluatedPerson: isEvaluatedCode,
            Evaluater: evaluaterCode,
            EvaluateContent: evaluateContent
        }
        const data = {
            UserCode: isEvaluatedCode
        }
        if (evaluateContent) {
            if (evaluateList.length < 7) {
                this.props.addComment(params, (res) => {
                    if (res.IsSuccess) {
                        Toast.success('添加评价成功', 1);
                    } else {
                        Toast.fail('添加评价失败', 1);
                    }
                    this.onClose()
                    this.props.getHisInfo(data);
                });
            } else {
                Toast.info('最多添加六条评价', 1);
            }
        } else {
            Toast.info('评价内容不能为空', 1);
        }
    }

    render() {
        const {hisInformation,userModel,hisSportData} = this.props;
        let honorImgData = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7']
        let map = Map(userModel);
        let cardInfoData = '';
        let cardList = '';
        let hisInfoData = '';
        let userSkills = [];
        let EvaluateList = [];
        let userTable = '';
        let badge = '';

        if(hisSportData){
            cardInfoData = Map(hisSportData);
            let cardToArray = cardInfoData.get('SportsStatistics');
            cardList = cardToArray.toJS();
        }

        if(hisInformation){
            hisInfoData = hisInformation.toJS();
            console.log("hisInfoData", hisInfoData)
            userSkills = hisInfoData.UserTable.UserSkill ? hisInfoData.UserTable.UserSkill.split(',') : '';
            EvaluateList = hisInfoData.UserTable.EvaluateList;
            userTable = hisInfoData.UserTable;
            badge = hisInfoData.UserTable.Badge;
        }

        return (
            <div className="userInnerWrap">
                <header className="userInner">
                    <div className="userImg">
                        <img src={hisInfoData.avatar} />
                    </div>
                    <div className="userLabel">
                        <div className="userName">{hisInfoData.name}</div>
                        <div className="userTitle">{hisInfoData.position}</div>
                        <div className="company">{userTable.GroupName}</div>
                    </div>
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
                                    {userTable.UserSign}
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
                                        userSkills ? userSkills.map((item,index)=>{
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
                                    <span>他人评价</span>
                                    <span className="operation iconfont icon-add" onClick={this.showModal('modal')}> 添加</span>
                                </div>
                                <div className='evaluateBox'>
                                    {
                                        EvaluateList.map((item, index) => {
                                            return(
                                                <span className='skill' key={index} onClick={() => {this.onItemClick(item.EvaluateCode)}}>
                                                    {item.EvaluateContent} ({item.LikeNum})
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
                                    <span className="iconfont icon-tishi" onClick={this.showBadgeModal('modalBadge')} style={{display: 'inline-block', fontSize: '14px', marginLeft: '10px'}}></span>
                                </div>
                                <div className='evaluateBox'>
                                    <div style={{overflow: "auto"}}>
                                        <div className='honorImgBox'>
                                            {
                                                honorImgData.map((item, i) => {
                                                    return (
                                                        <img key={i} src={`${baseUrl}/termImg/myhonorimg/${item}.png`} style={i+1 <= badge ? { width: (50+ (i*10))+'px', height: (50+ (i*8))+'px'} : {filter: "grayscale(100%)", WebkitFilter: "grayscale(100%)", width: (50+ (i*10))+'px', height: (50+ (i*8))+'px'}} />
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
                    title=""
                    footer={[
                        { text: '取消', onPress: () => { console.log('ok'); this.onClose('modal')(); } },
                        { text: '提交', onPress: () => {this.onSubmit(); this.onClose('modal')();} } ,
                    ]}
                    >
                    <InputItem
                        clear
                        placeholder="最多可输入六个字"
                        maxLength='6'
                        value={this.state.evaluateContent}
                        onChange={(value) => {this.onInputChange(value)}}
                    >
                    </InputItem>
                </Modal>
                <Modal
                    visible={this.state.modalBadge}
                    transparent
                    maskClosable={false}
                    onClose={this.onBadgeClose('modalBadge')}
                    title="荣誉等级获得条件"
                    footer={[{ text: '关闭', onPress: () => { console.log('ok'); this.onBadgeClose('modalBadge')(); } }]}
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
    hisInformation:state.getIn(['his','hisInformation']),
    hisSportData:state.getIn(['his','hisSportData']),
})
const mapDispatch = (dispatch) => ({
    getHisInfo(data) {
        dispatch(actionCreators.getHisInfo(data));
    },
    getHisSportData(data) {
        dispatch(actionCreators.getHisSportData(data));
    },
    addLike(data, callback) {
        dispatch(actionCreators.addLike(data, callback))
    },
    addComment(data, callback) {
        dispatch(actionCreators.addComment(data, callback))
    }
})

export default connect(mapState,mapDispatch)(withRouter(UserInfo));