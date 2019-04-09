import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge, ListView, Toast, PullToRefresh} from "antd-mobile";
import "./index.less";
import {Link} from "react-router-dom";
import ReactDOM from "react-dom";
import * as req from "../../../request";

class SportCheck extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            couponList: [],
            pageNo: 1,
            pageSize: 13, // 分页size
            totalPage: 0, // 总页数初始化
            isShowContent: false, // 控制页面再数据请求后显示
            refreshing: true, // 是否显示刷新状态
            dataSource,
            isLoading: false, // 是否显示加载状态
            height: document.documentElement.clientHeight,
        };
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 50;
        this.setState({
            height: hei
        })
        this.requestCouponsList();
        // const {changeCheckList,userCode} = this.props;
        // changeCheckList(userCode);
    }
    // 获取列表
    requestCouponsList() {
        const {userCode} = this.props;
        let dataInfo = {
            UserCode: userCode,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
         //  /api/RunData/AuditList
        req.post('/api/RunData/AuditList',dataInfo).then((res) => {
            let couponList = [...this.state.couponList, ...res.PageList];
            console.log(couponList)
            this.setState({
                isShowContent: true,
                pageNo: this.state.pageNo + 1,
                couponList: couponList,
                dataSource: this.state.dataSource.cloneWithRows(couponList), // 数据源dataSource
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
            couponList: [],
        }, () => {
            this.requestCouponsList();
        })
    };
    getCheckState(auditStatus) {
        switch (auditStatus) {
            case 0:
                return {
                    value:"待审核",
                    color:"#03a9f4"
                }
            case 1:
                return {
                    value:"通过",
                    color:"#4caf50"
                }
            case 2:
                return {
                    value:"不通过",
                    color:"#f44336"
                }
            case 3:
                return {
                    value:"疑问",
                    color:"#ffc107"
                }
            default:
                return {
                    value:"",
                    color:"#000000"
                }
        }
    }
    // 加载更多
    onEndReached = () => {
        if (this.state.isLoading || (this.state.totalPage < this.state.pageNo)) {
            Toast.hide();
            return;
        }
        this.setState({
            isLoading: true,
        }, () => {
            this.requestCouponsList()
        });
    };
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className='checkListWrap' key={rowID}>
                    <Link to={`/sport/checkDetail/${rowData.DataCode}`}>
                        <List.Item className='checkTitle'>
                            <span className="checkUser">{rowData.UserName}</span>
                            <span className="sportTips">当日已完成{rowData.DailyDistance}km</span>
                            <span className='sportStatus' style={{color:this.getCheckState(rowData.AuditStatus).color}}>{this.getCheckState(rowData.AuditStatus).value}</span>
                        </List.Item>
                        <List.Item arrow="horizontal">
                            <Badge text={0}>
                                <div className='checkInnerWrap'>
                                    <div className='checkLeft'>
                                        <div className="checkTime"> 时间 <span>{rowData.RunDate}</span></div>
                                        <div className="checkKm">距离：{rowData.RunDistance}km</div>
                                    </div>
                                    <div className='checkRight'>
                                        <div className="checkDuring">时间 ：<span>{rowData.RunTimeLong}分钟</span></div>
                                        <div>配速 ：<span>{rowData.RunSpeed}min/km</span></div>
                                    </div>
                                </div>
                            </Badge>
                        </List.Item>
                    </Link>
                </div>
            );
        };
        return (
            <div className='checkInnerWrap'>
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
                    initialListSize={13}
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
    userCode:state.getIn(['login','userCode'])
})
const mapDispatch = (dispatch) =>({


})
export default connect(mapState,mapDispatch)(SportCheck)