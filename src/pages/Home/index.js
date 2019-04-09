import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {NoticeBar, Card, WingBlank, WhiteSpace,Button, List, ListView} from 'antd-mobile';
import {actionCreators} from './store';
import "./index.less";
import {baseUrl} from "../../request";
import { width } from 'window-size';

const Item = List.Item;
const Brief = Item.Brief;
const goldImgList = ['gold1','gold2','gold3']
class Home extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            activityList: [],
            pageNo: 1,
            pageSize: 10, // 分页size
            totalPage: 0, // 总页数初始化
            isShowContent: false, // 控制页面再数据请求后显示
            refreshing: true, // 是否显示刷新状态
            dataSource,
            isLoading: false, // 是否显示加载状态
            height: document.documentElement.clientHeight,
        };
    }

    getList(type){
        let newList = ''
        if(type === 'lastWeek'){
            const {rankList} = this.props;
            newList = rankList.toJS();
        }else if(type === 'thisMonth'){
            const {thisMonthRank} = this.props;
            newList = thisMonthRank.toJS();
        }else if(type === 'thisQuarter'){
            const {thisQuarterRank} = this.props;
            newList = thisQuarterRank.toJS();
        }else if(type === 'lastQuarter'){
            const {lastQuarterRank} = this.props;
            newList = lastQuarterRank.toJS();
        }
        const pageList = [];
        if(newList.length){
            for(let i = 0;i<3;i++){
                pageList.push(
                    <div key={i} className='goldItem'>
                        <img className='goldIcon' src={`${baseUrl}/termImg/sport/${goldImgList[i]}.jpg`} />
                        <p className="getName"> {newList[i]?(newList[i].RunDistanceNum===0?"虚位以待":newList[i].UserName):"虚位以待"}</p>
                        <h3 className="getLength">{newList[i]?newList[i].RunDistanceNum:"0"}KM</h3>
                    </div>
                )
            }
        }
        return (
            pageList
        )
    }
    componentDidMount() {
        const {getRankData,getThisMonthRank,getThisQuarterRank,getLastQuarterRank,getRankingList} = this.props;
        getRankData();
        getThisMonthRank();
        getThisQuarterRank();
        getLastQuarterRank();
        getRankingList();
    }
    render() {
        const {rankList, rankingList, userCode} = this.props;
        const newrRankingList = rankingList.toJS()
        const newList = rankList.toJS();
        let honorImgData = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7']

        return (
            <div>
                <NoticeBar marqueeProps={{loop: true, style: {padding: '0 7.5px'}}}>
                    Notice: {newList[0]? (newList[0].RunDistanceNum !== 0 ? `恭喜${newList[0].UserName}荣获上周运动冠军！人生处处PK场，认真对待不恐慌，拼尽全力撑到底，铿锵倒下也无妨！笑迎失败无遗憾，傲立天下我最棒！`:'暂无人上榜~') :''}
                </NoticeBar>
                <div className="paiMing">
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Card>
                            <Card.Header
                                title="上周运动总里程排名"
                            />
                            <Card.Body>
                                <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                    {this.getList('lastWeek')}
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                    <List renderHeader={() => '排行榜'} className="my-list">
                        {
                            newrRankingList.length ? newrRankingList.map((item, index) => {
                                return(
                                    <Link to={item.UserCode == userCode ? `/my` : `/his/userInfo/index/${item.UserCode}`} key={item.UserCode}>
                                        <div className="list-wrap" >
                                            {
                                                index < 3 ? (
                                                    <p className="list-order">
                                                        <img src={`${baseUrl}/termImg/medalImgs/medal${item.Id}.png`} />
                                                    </p>
                                                ) : (
                                                    <p className="list-order"> {item.Id} </p>
                                                )
                                            }
                                            
                                            <p className="list-photo">
                                                <img src={item.avatar} />
                                            </p>
                                            <p className="list-info">
                                                <span className="list-name">{item.UserName}</span> <br />
                                                <span className="list-score">胜 {item.WIN} 场 &nbsp; 负 {item.Lose} 场 &nbsp; 点赞：{item.Praise} 次</span>
                                            </p>
                                            <p className="list-honor">
                                                {
                                                    item.Badge ? (
                                                        <img src={`${baseUrl}/termImg/myhonorimg/grade${item.Badge}.png`} />
                                                    ) : null
                                                }
                                            </p>
                                        </div>
                                    </Link>
                                )
                            }) : null
                        }
                    </List>             
                </div>
            </div>
        )
    }
}

const mapStateToprops = (state) => ({
    rankList: state.getIn(['home', 'sportRank']),
    thisMonthRank:state.getIn(['home','thisMonthRank']),
    thisQuarterRank:state.getIn(['home','thisQuarterRank']),
    lastQuarterRank:state.getIn(['home','lastQuarterRank']),
    rankingList: state.getIn(['home', 'rankingList']),
    userCode: state.getIn(['login','userCode']),
})
const mapDispatchToProps = (dispatch) => ({
    getRankData(){
        dispatch(actionCreators.getRankData())
    },
    getThisMonthRank(){
        dispatch(actionCreators.getThisMonthRank())
    },
    getThisQuarterRank(){
        dispatch(actionCreators.getThisQuarterRank())
    },
    getLastQuarterRank(){
        dispatch(actionCreators.getLastQuarterRank())
    },
    getRankingList() {
        dispatch(actionCreators.getRankingList())
    }
})
export default connect(mapStateToprops, mapDispatchToProps)(Home);