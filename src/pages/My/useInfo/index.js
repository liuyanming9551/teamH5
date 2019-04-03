import React, { Component } from "react";
import { List, Card, WingBlank, WhiteSpace, Button, Carousel,Tag } from 'antd-mobile';
import {Map} from "immutable";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import "./index.less";
import {actionCreators} from "../store";
import {baseUrl} from "../../../request";
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
        const {history} = this.props;
        history.push('/my/changeDetail');
    }
    render() {
        const {userInformation,userModel,cardInfo, myHonor} = this.props;
        let honorImgData = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7']
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
                    {/*<WingBlank size="md">*/}
                        {/*<Card>*/}
                            {/*<Card.Body>*/}
                                {/*<div className='cardTitle'>*/}
                                    {/*他人评价*/}
                                {/*</div>*/}
                                {/*<div className='evaluateBox'>*/}
                                    {/*<span className='skill'>美丽（1）</span>*/}
                                    {/*<span className='skill'>大方</span>*/}
                                    {/*<span className='skill'>迷人</span>*/}
                                    {/*<span className='skill'>with icon and inline</span>*/}
                                    {/*<span className='skill'>完了,这个人废了（99999）</span>*/}
                                {/*</div>*/}
                            {/*</Card.Body>*/}
                        {/*</Card>*/}
                        {/*<WhiteSpace size="sm" />*/}
                    {/*</WingBlank>*/}
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
                    {/* <WingBlank size="md">
                        <Card>
                            <Card.Body>
                                <div className='cardTitle'>
                                    个人季度荣誉等级
                                </div>
                                    <div className='honorImgBox'>
                                    {
                                        honorImgData.map((item, i) => {
                                            return (
                                                <img src={`${baseUrl}/termImg/myhonorimg/${item}.png`} style={{filter: "grayscale(100%)", width: (50+ (i*8))+'px', height: (50+ (i*8))+'px'}} />
                                            )
                                        })
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank> */}
                </footer>
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
    }
})
export default connect(mapState,mapDispatch)(withRouter(UserInfo));