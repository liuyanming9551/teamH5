import React, { Component } from "react";
import { List, Card, WingBlank, WhiteSpace, Button, Carousel,Modal } from 'antd-mobile';
import {Map} from "immutable";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import "./index.less";
import {actionCreators} from "../store";
const Item = List.Item;
const alert = Modal.alert;
class UserInfo extends Component {
    state = {
        imgHeight: 100,
        deleteVisible: false,
        likeStatus: false,
        commentData: [
            {content: '美丽', like: 1},
            {content: '可爱', like: 3},
            {content: '大方', like: 5}
        ]
    }

    componentDidMount() {
        const {userCode} = this.props;
        this.props.getHisInfo(userCode)
    }

    // 点击添加评价
    onAdd = () => {
        const {history} = this.props;
        history.push('/his/AddComment');
    }

    // 确认删除
    confirmDelete = (index) => {
        console.log("confirmDelete", index)

    }

    // 点击标签，点赞或取消
    onItemClick = (index) => {
        
    }

    render() {
        const {userInformation,userModel,cardInfo,userCode} = this.props;
        const {deleteVisible, commentData} = this.state;
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
            console.log("userInformation", userInformation)
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
                                    <span>他人评价</span>
                                    <span className="operation iconfont icon-add" onClick={() => {this.onAdd()}}> 添加</span>
                                </div>
                                <div className='evaluateBox'>
                                    {
                                        commentData.map((item, index) => {
                                            return(
                                                <span className='skill' key={index} onClick={() => {this.onItemClick(index)}}>
                                                    {item.content} ({item.like})
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
                </footer>
            </div>
        )
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    userInformation:state.getIn(['his','userInformation']),
})
const mapDispatch = (dispatch) => ({
    getHisInfo(userCode){
        let param = {
            UserCode:userCode
        }
        dispatch(actionCreators.getHisInfo(param));
    }
})

export default connect(mapState,mapDispatch)(withRouter(UserInfo));