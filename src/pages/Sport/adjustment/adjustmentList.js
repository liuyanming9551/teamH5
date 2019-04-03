import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {PullToRefresh, ListView, Toast, List, Badge, Modal} from 'antd-mobile';
import ReactDOM from 'react-dom';
import "./index.less";
import axios from "axios";
import * as req from '../../../request';
import {baseUrl} from './../../../request';
import Qs from 'qs';
const operation = Modal.operation;
class AdjustmentList extends React.Component {
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
    componentDidMount(){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 50;
        this.setState({
            height:hei
        })
        this.getActivityList();
    }

    // 获取列表
    getActivityList() {
        let dataInfo = {
            // RunDateNum:0,
            // UserCode:"B7AF1D6B-964A-4EDB-9F02-5324F71CDBEE",
            // AuditStatus:4,
            ActivityDateNum: 0,
            ParameterCode: '',
            PageIndex:this.state.pageNo,
            PageSize:this.state.pageSize,
        }
        req.post('/api/AdjustedData/ActivityList', dataInfo).then((res) => {
            let activityList = [...this.state.activityList, ...res.PageList];
            // console.log(activityList)
            this.setState({
                isShowContent: true,
                pageNo: this.state.pageNo + 1,
                activityList: activityList,
                dataSource: this.state.dataSource.cloneWithRows(activityList), // 数据源dataSource
                totalPage:Math.ceil(res.TotalNumber/this.state.pageSize),
                refreshing: false,
                isLoading: false,
            }, () => {
                Toast.hide();
            });
        }).catch((res) => {


        })

    }

    // 下拉刷新
    onRefresh = () => {
        this.setState({
            pageNo: 1,
            totalPage: 0,
            activityList: [],
        },()=>{
            this.getActivityList();
        })
    };

    // 加载更多
    onEndReached = () => {
        if (this.state.isLoading || (this.state.totalPage < this.state.pageNo)) {
            Toast.hide();
            return;
        }
        this.setState({
            isLoading: true,
        },()=>{
            this.getActivityList()
        });
    };
    render() {
        const {rightControl} = this.props;
        const row =  (rowData, sectionID, rowID) => {
            return (
                <div className="list-wrap" key={rowID}>
                    <List className="my-list" style={{textAlign: 'center'}}>
                        <Link to={`/sport/adjustmentDetail/${rowData.ActivityCode}`}>
                            <List.Item>
                                <Badge text={0} style={{marginLeft: "12px"}}>
                                    <div className="list-content">
                                        <p>
                                            <span className="act-name">{rowData.ActivityName}</span>
                                            <span className="act-number">参加人数：{rowData.Number}人</span>
                                        </p>
                                        <p className="act-discription">
                                            {rowData.ActivityRemark}
                                        </p>
                                        <p className="act-date">
                                            {rowData.ActivityDate}
                                        </p>
                                    </div>
                                    <div className="list-img">
                                        <img src={`${baseUrl}/${rowData.ImgUrl}`} />
                                    </div>
                                </Badge>
                            </List.Item>
                        </Link>
                    </List>
                </div>
            );
        } ;
        return (
            <div className="adjustment-list">
                <div className="activeBtn">
                    {
                        rightControl ? (
                            <span className="iconfont icon-bianji" onClick={() => operation([
                                {
                                    text: '新建', onPress: () => {
                                        this.props.location.history.push('/sport/createAdjustment')
                                    }
                                },
                                {
                                    text: '筛选', onPress: () => {
                                        this.props.location.history.push('/sport/searchSport')
                                    }
                                },
                            ])}
                        />
                        ) : (
                            <span className="iconfont icon-bianji" onClick={() => operation([
                                {
                                    text: '筛选', onPress: () => {
                                        this.props.location.history.push('/sport/searchSport')
                                    }
                                },
                            ])}
                        />
                        )
                    }
                    
                </div>
                {/* <div className="list-wrap">
                    <List className="my-list" style={{textAlign: 'center'}}>
                        <Link to="/sport/adjustmentDetail">
                            <List.Item>
                                <div className="list-content">
                                    <p>
                                        <span className="ad-name">爬凤凰山</span>
                                        <span className="ad-time">参加人数：3人</span>
                                    </p>
                                    <p className="list-discription">
                                        在一个阳光明媚、晴空万里的周末，小伙伴们相约一起去爬凤凰山。
                                    </p>
                                    <p>
                                        2019-03-21
                                    </p>
                                </div>
                                <div className="list-img">
                                    <img src="" />
                                </div>
                            </List.Item>
                        </Link>
                    </List>
                </div> */}
                <ListView
                    className="list-view"
                    key={1}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div className="loadFooter">
                        {this.state.isLoading ? '正在加载...' : '真的没有了'}
                    </div>)}
                    style={{
                        height: this.state.height,
                    }}
                    renderRow={row}
                    initialListSize={10}
                    distanceToRefresh='20'
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}
                    pageSize={this.state.pageSize}
                />
            </div>

        );
    }
}

const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    rightControl: state.getIn(['sport', 'rightControl']),
})

const mapDispatch = (dispatch) => ({
    // getActivityList(){
    //     dispatch(actionCreators.getActivityList())
    // }
})

export default connect(mapState,mapDispatch)(AdjustmentList);
