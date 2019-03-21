import React, { Component } from "react";
import { List, Card, WingBlank, WhiteSpace, Button, Carousel,Tag } from 'antd-mobile';
import {Map} from "immutable";
import {connect} from 'react-redux';
import "./index.less";
import {actionCreators} from "../store";
const Item = List.Item;
class UserInfo extends Component {
    state = {
        imgHeight: 100,
    }
    componentDidMount() {
        const {userCode} = this.props;
        // simulate img loading

        this.props.getUserInfo(userCode)

    }
    changeDetailInfo = () =>{
        const {location} = this.props;
        location.history.push('/my/changeDetail');
    }
    render() {
        const {userInformation,userModel,cardInfo} = this.props;
        console.log(cardInfo)

        let map = Map(userModel);
        let userInformationData = '';
        let userSkills = [];
        let cardList = '';
        let cardInfoData = '';
        if(cardInfo){
            cardInfoData = Map(cardInfo);
            let cardToArray = cardInfoData.get('SportsStatistics');
            cardList = cardToArray.toJS();
        }
        if(userInformation){
            userInformationData = userInformation.toJS();
            userSkills = userInformationData.UserSkill?userInformationData.UserSkill.split(','):'';
        }
        return (
            <div className="userInnerWrap">
                <header className="userInner">
                    <div className="userImg">
                        <img src={map.get("avatar")} />
                    </div>
                    <div className="userLabel">
                        <div className="userName">{userInformationData.UserName}</div>
                        <div className="userTitle">高级软件工程师</div>
                        <div className="company">北京易勤信息技术有限公司</div>
                    </div>
                    <div className='changeDetail' onClick={this.changeDetailInfo}>修改资料</div>
                </header>

                <footer className="ownDesc">
                    <WingBlank size="md">
                        <WhiteSpace size="lg" />
                        <Card>
                            <Card.Header className="cardTitle"
                                title="自我评价"

                            />
                            <Card.Body>
                                <div className="evaluateDesc">{userInformationData.UserSign}</div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Header className="cardTitle"
                                         title="用户技能"
                            />
                            <Card.Body>
                                <div className="evaluateList">
                                    {
                                        userSkills?userSkills.map((item,index)=>{
                                            return (
                                                <Tag data-seed="logId" key={index} className="skill">{item}</Tag>
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
                            <Card.Header className="cardTitle"
                                title="他人评价"

                            />
                            <Card.Body>
                                    {/*<Button className="evaluateBtn"  size="small">美丽（1）</Button>*/}
                                    {/*<Button className="evaluateBtn"  size="small">大方</Button>*/}
                                    {/*<Button className="evaluateBtn"  size="small">迷人</Button>*/}
                                    {/*<Button className="evaluateBtn" inline size="small">with icon and inline</Button>*/}
                                    {/*<Button className="evaluateBtn" inline size="small">一点都不好</Button>*/}
                                    {/*<Button className="evaluateBtn" inline size="small">完了,这个人废了（99999）</Button>*/}

                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>

                    <WingBlank size="md">
                        <Card>

                            <Card.Header className="cardTitle"
                                title="本周排名"
                            />
                            <Card.Body>
                                <span className="rankTitle">排名：</span>
                                <span className="rank">第{cardInfoData?cardInfoData.get('RankingThisWeek'):'--'}名</span>
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
                                                    <div className="cardListTitle">今日运动</div>
                                                    <div className="cardDetailWrap">
                                                        <div className="cardDetailMin">运动天数：{val.CountDays}</div>
                                                        <div className="cardDetailNum">运动量：{val.CountRunDistance}km</div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </a>
                                    )):''}
                                </Carousel>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>

                            <Card.Header className="cardTitle"
                                title="我的段位"
                            />


                            <Card.Body>
                                {/*<img src=""/>*/}
                            </Card.Body>

                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>

                </footer>
            </div>
        )
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    userInformation:state.getIn(['my','userInformation']),
    userModel:state.getIn(['login','userModel']),
    cardInfo:state.getIn(['my','cardInfo'])
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
    }
})
export default connect(mapState,mapDispatch)(UserInfo);