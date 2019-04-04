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
        const {getRankData,getThisMonthRank,getThisQuarterRank,getLastQuarterRank} = this.props;
        getRankData();
        getThisMonthRank();
        getThisQuarterRank();
        getLastQuarterRank();
    }
    render() {
        const {rankList} = this.props;
        const newList = rankList.toJS();
        const row =  (rowData, sectionID, rowID) => {
            return (
                <List renderHeader={() => '排行榜'} className="my-list">
                    <Link to={`/sport/adjustmentDetail/${rowData.ActivityCode}`}>
                        <div className="list-wrap">
                            <p className="list-order">
                                <img src={`${baseUrl}/termImg/medalImgs/medal1.png`} />
                            </p>
                            <p className="list-photo">
                                <img src="http://www.agri35.com/UploadFiles/img_0_2786531238_3176367074_26.jpg"/>
                            </p>
                            <p className="list-info">
                                <span className="list-name">马晓敏</span> <br />
                                <span className="list-score">胜3场&nbsp;负2场&nbsp;平1场 &nbsp; 点赞：5次</span>
                            </p>
                            {/* <p className="list-honor">
                                <img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"/>
                            </p> */}
                        </div>
                    </Link>
                </List>
            );
        } ;
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
                        <Link to="/his">
                        <div className="list-wrap">
                            <p className="list-order">
                                <img src={`${baseUrl}/termImg/medalImgs/medal1.png`} />
                            </p>
                            <p className="list-photo">
                                <img src="http://www.agri35.com/UploadFiles/img_0_2786531238_3176367074_26.jpg"/>
                            </p>
                            <p className="list-info">
                                <span className="list-name">马晓敏</span> <br />
                                <span className="list-score">胜3场&nbsp;负2场&nbsp;平1场 &nbsp; 点赞：5次</span>
                            </p>
                            {/* <p className="list-honor">
                                <img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"/>
                            </p> */}
                        </div>
                        </Link>
                        <div className="list-wrap">
                            <p className="list-order">2</p>
                            <p className="list-photo">
                                <img src="http://pic.51yuansu.com/pic3/cover/00/63/25/589bdedf5475d_610.jpg"/>
                            </p>
                            <p className="list-info">
                                <span className="list-name">马晓敏</span> <br />
                                <span className="list-score">胜3场&nbsp;负2场&nbsp;平1场 &nbsp; 点赞：5次</span>
                            </p>
                            {/* <p className="list-honor">
                                <img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"/>
                            </p> */}
                        </div>
                    </List>
                    <ListView
                        className="list-view"
                        key={1}
                        dataSource={this.state.dataSource}
                        renderRow={row}
                    />
                    {/* <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Card>
                            <Card.Header
                                title="本月运动总里程排名"
                            />
                            <Card.Body>
                                <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                    {this.getList('thisMonth')}
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Card>
                            <Card.Header
                                title="本季度运动总里程排名"
                            />
                            <Card.Body>
                                <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                    {this.getList('thisQuarter')}
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Card>
                            <Card.Header
                                title="上季度排名"
                            />
                            <Card.Body>
                                <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                    {this.getList('lastQuarter')}
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </WingBlank> */}              
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
    }
})
export default connect(mapStateToprops, mapDispatchToProps)(Home);