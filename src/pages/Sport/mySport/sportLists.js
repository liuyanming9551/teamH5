import React, {Component} from 'react';
import axios from 'axios';
import Qs from 'qs';
import ReactDOM from 'react-dom';
import {PullToRefresh, ListView, Toast, List, Badge, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import "./index.less";
import {Link} from "react-router-dom";
const operation = Modal.operation;

class SportList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            couponList: [],
            pageNo: 0,
            pageSize: 20, // 分页size
            totalPage: 0, // 总页数初始化
            isShowContent: false, // 控制页面再数据请求后显示
            refreshing: false, // 是否显示刷新状态
            dataSource,
            isLoading: false, // 是否显示加载状态
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 50;
        this.requestCouponsList();
        this.setState({
            height: hei
        })
    }

    // 获取列表
    requestCouponsList() {
        let dataInfo = {
            RunDateNum: 0,
            UserCode: "B7AF1D6B-964A-4EDB-9F02-5324F71CDBEE",
            AuditStatus: 4,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
        axios({
            method: "post",
            url: "http://10.168.1.115:8080/api/RunData/MyMotionData",
            data: Qs.stringify(dataInfo)
        }).then((res) => {
            let result = res.data;
            let couponList = [...this.state.couponList, ...result.PageList];
            this.setState({
                isShowContent: true,
                pageNo: this.state.pageNo + 1,
                couponList: couponList,
                dataSource: this.state.dataSource.cloneWithRows(couponList), // 数据源dataSource
                totalPage: 2,
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
        Toast.loading();
        this.setState({
            pageNo: 0,
            totalPage: 0,
            couponList: [],
        }, () => {
            this.requestCouponsList();
        })
    };

    // 加载更多
    onEndReached = () => {
        if (this.state.isLoading || (this.state.totalPage < this.state.pageNo + 1)) {
            Toast.hide();
            return;
        }
        this.setState({
            isLoading: true,
        }, () => {
            this.requestCouponsList()
        });
    };

    getCheckState(auditStatus) {
        switch (auditStatus) {
            case 0:
                return "待审批"
            case 1:
                return "通过"
            case 2:
                return "不通过"
            case 3:
                return "疑问"
            default:
                return "出错了"
        }
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} style={{margin: '10px 0', background: '#fff'}}>
                    <List className="my-list" style={{textAlign: 'center'}}>
                        <Link to='/sport/viewSport'>
                            <List.Item arrow="horizontal">
                                <Badge text={0} style={{marginLeft: "12px"}}>
                                    <span className='listIcon'></span>
                                    <span className='listTime'>{rowData.RunDate}</span>
                                    <span className='listState'>{this.getCheckState(rowData.AuditStatus)}</span>
                                    <span className='listNumber'>{rowData.RunDistance}KM</span>
                                </Badge>
                            </List.Item>
                        </Link>
                    </List>
                </div>
            );
        };
        return (
            <div>
                <div className="activeBtn">
                    <img onClick={this.showShareActionSheet}
                         onClick={() => operation([
                             {
                                 text: '新建', onPress: () => {
                                     this.props.location.history.push('/sport/createSport')
                                 }
                             },
                             {
                                 text: '筛选', onPress: () => {
                                     this.props.location.history.push('/sport/searchSport')
                                 }
                             },
                         ])}
                    />
                </div>
                <ListView
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

                    distanceToRefresh='20'
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={30}
                    pageSize={this.state.pageSize}
                />
            </div>

        );
    }
}

const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({})
export default connect(mapState, mapDispatch)(SportList)