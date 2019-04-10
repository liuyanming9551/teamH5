import React, {Component} from 'react';
import * as req from '../../../request';
import ReactDOM from 'react-dom';
import {PullToRefresh, ListView, Toast, List, Badge, Modal, SwipeAction} from 'antd-mobile';
import {connect} from 'react-redux';
import "./index.less";
import {Link} from "react-router-dom";
import { actionCreators } from './../store';
import Search from './../../../component/search';
const operation = Modal.operation;
class SportList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            couponList: [],
            pageNo: 1,
            pageSize: 20, // 分页size
            totalPage: 0, // 总页数初始化
            isShowContent: false, // 控制页面再数据请求后显示
            refreshing: true, // 是否显示刷新状态
            dataSource,
            isLoading: false, // 是否显示加载状态
            height: document.documentElement.clientHeight,
            showMask:false
        };
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 50;
        this.setState({
            height: hei
        })
        this.requestCouponsList();
    }
    componentWillUnmount() {
        operation().close();
    }
    // 获取列表
    requestCouponsList(runDateNum = 0,auditStatus = 4) {
        const {userCode} = this.props;
        let dataInfo = {
            RunDateNum:runDateNum,
            UserCode: userCode,
            AuditStatus: auditStatus,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
        req.post('/api/RunData/MyMotionData',dataInfo).then((res) => {
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

    // 删除
    onDelete = (v) => {
        const data = {
            DataCode: v
        };
        this.props.deleteRunData(data, (res) => {
            this.setState({
                pageNo: 1,
                totalPage: 0,
                couponList: [],
            }, () => {
                this.requestCouponsList();
            })
        });
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
    getCheckIcon(auditStatus) {
        switch (auditStatus) {
            case 0:
                return "listIcon iconfont icon-daishenhe"
            case 1:
                return "listIcon iconfont icon-shenpitongguo"
            case 2:
                return "listIcon iconfont icon-shenhebutongguo"
            case 3:
                return "listIcon iconfont icon-order-question2"
            default:
                return "出错了"
        }
    }
    onClose = (msg) =>{
        this.setState({
            showMask:msg.showMask
        })
    }
    onConfirm = (options) =>{
        const [runDateNum,auditStatus] = options;
        let searchData = runDateNum?runDateNum.label:runDateNum;
        let searState = auditStatus?auditStatus.label:auditStatus;
        this.setState({
            pageNo: 1,
            totalPage: 0,
            couponList: [],
        }, () => {
            this.requestCouponsList(searchData,searState);
        })
    }

    render() {
        const searchData = [{
            labelTips:"时间区间",
            dataList:[
                {
                    value:'全部',
                    label:0
                },
                {
                    value:'今天',
                    label:1
                },
                {
                    value:'本周内',
                    label:2
                },
                {
                    value:'本月内',
                    label:3
                },
                {
                    value:'本季度',
                    label:4
                }
            ],
            id:1
        },{
            labelTips:"状态",
            dataList:[
                {
                    value:'未审核',
                    label:0
                },
                {
                    value:'通过',
                    label:1
                },
                {
                    value:'不通过',
                    label:2
                },
                {
                    value:'疑问',
                    label:3
                },
                {
                    value:'全部',
                    label:4
                }
            ],
            id:2
        }]
        const row = (rowData, sectionID, rowID) => {
            console.log(rowData)
            return (
                <div key={rowID} style={{margin: '10px 0', background: '#fff'}}>
                    <List className="my-list" style={{textAlign: 'center'}}>
                    <SwipeAction
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                    {
                                        text: 'Delete',
                                        onPress: () => {this.onDelete(rowData.DataCode)},
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                                    onOpen={() => console.log('global open')}
                                    onClose={() => console.log('global close')}
                                >
                            <Link to={`/sport/viewSport/${rowData.DataCode}`}>
                                <List.Item arrow="horizontal">
                                    <Badge text={0} style={{marginLeft: "12px"}}>
                                        <span className={this.getCheckIcon(rowData.AuditStatus)}></span>
                                        <span className='listTime'>{rowData.RunDate}</span>
                                        <span className='listState'>{this.getCheckState(rowData.AuditStatus)}</span>
                                        <span className='listNumber'>{rowData.RunDistance}KM</span>
                                    </Badge>
                                </List.Item>
                            </Link>
                        </SwipeAction>
                    </List>
                </div>
            );
        };
        return (
            <div className="listview-wrap">
                <Search
                    data={searchData}
                    showMask={this.state.showMask}
                    onClose={this.onClose}
                    onOk={this.onConfirm}
                />
                <div className="activeBtn">
                    <span className="iconfont icon-bianji" onClick={() => operation([
                             {
                                 text: '新建', onPress: () => {
                                     this.props.location.history.push('/sport/createSport')
                                 }
                             },
                             {
                                 text: '筛选', onPress: () => {
                                     this.setState({
                                         showMask:true
                                     })
                                 }
                             },
                         ])}
                    />
                </div>
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
const mapDispatch = (dispatch) => ({
    deleteRunData(data, callback) {
        dispatch(actionCreators.deleteRunData(data, callback));
    }
})
export default connect(mapState, mapDispatch)(SportList)