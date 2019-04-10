import React, {PureComponent} from 'react';
import * as req from '../../request';
import {Link, withRouter} from "react-router-dom";
import {Modal, List, Badge, ListView, Toast, PullToRefresh} from 'antd-mobile';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Search from './../../component/search';
import './index.less';

const operation = Modal.operation;

class PkList extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row3, row4) => row3 !== row4,
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
            showMask:false
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv2).offsetTop - 50;
        this.setState({
            height: hei
        })
        this.requestCouponsList();


    }

    //获取列表
    requestCouponsList() {
        let dataInfo = {
            PKDate: 0,
            PKAccept: 4,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
        req.post('/api/PK/PKList', dataInfo).then((res) => {
            let couponList = [...this.state.couponList, ...res.PageList];
            this.setState({
                isShowContent: false,
                pageNo: this.state.pageNo + 1,
                couponList: couponList,
                dataSource: this.state.dataSource.cloneWithRows(couponList), // 数据源dataSource
                totalPage: Math.ceil(res.TotalNumber / this.state.pageSize),
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

    getPkState(pkStatus) {
        switch (pkStatus) {
            case 0:
                return "未开始"
            case 1:
                return "已开始"
            case 2:
                return "已结束"
            default:
                return "出错了"
        }

    }

    getPkAccept(pKAccept) {
        switch (pKAccept) {
            case 0:
                return "未读"
            case 1:
                return "已读"
            case 2:
                return "接受"
            case 3:
                return "拒绝"
            default:
                return "出错了"
        }
    }

    getBgColor(pkAccept, runDistanceA, runDistanceB) {
        //0未读1已读2接受3拒绝
        switch (pkAccept) {
            case 0:
                return {
                    innerBg: {
                        background: "none"
                    },
                    vaderWh: {
                        width: '0%'
                    }
                }
            case 1:
                return {
                    innerBg: {
                        background: "none"
                    },
                    vaderWh: {
                        width: '0%'
                    }
                }
            case 2:
                let countWh;
                if (runDistanceA === runDistanceB) {
                    countWh = "50%"
                } else {
                    countWh = parseInt(runDistanceA / (runDistanceA + runDistanceB) * 100)  + '%';
                }
                return {
                    innerBg: {
                        background: "#1131e6"
                    },
                    vaderWh: {
                        width: countWh
                    }
                }

            case 3:
                return {
                    innerBg: {
                        background: "#9e9e9e"
                    },
                    vaderWh: {
                        width: '0%'
                    }
                }
            default:
                return {
                    innerBg: {
                        background: "none"
                    },
                    vaderWh: {
                        width: '0%'
                    }
                }
        }


    }
    onClose = (msg) =>{
        this.setState({
            showMask:msg.showMask
        })
    }
    onConfirm = () =>{

        console.log('我点击了确定')
    }
    onReset = () =>{

        console.log('我点击了重置按钮')
    }
    onClickBtn = (options) =>{
        // console.log(options)
    }
    render() {
        const searchData = [{
            labelTips:"日期区间",
            dataList:[
                {
                    value:'未审核',
                    label:0
                },
                {
                    value:'已通过',
                    label:1
                },
                {
                    value:'未通过',
                    label:2
                },
                {
                    value:'疑问',
                    label:3
                }
            ],
            id:1
        },{
            labelTips:"日期区间2",
            dataList:[
                {
                    value:'未审核1',
                    label:0
                },
                {
                    value:'已通过2',
                    label:1
                },
                {
                    value:'未通过3',
                    label:2
                },
                {
                    value:'疑问4',
                    label:3
                },
                {
                    value:'未通过5',
                    label:2
                },
                {
                    value:'疑问6',
                    label:3
                }
            ],
            id:2
        }]
        const row = (rowData, sectionID, rowID) => {
            let queryInfo = {pkCode: rowData.PKCode, pkAccept: rowData.PKAccept, pkAcceptName: rowData.PKBUserName};
            let path = {
                pathname: '/pk/personallook',
                query: queryInfo
            }
            return (
                <div key={rowID} style={{margin: '10px 0'}}>
                    <List>
                        <Link to={path}>
                            <List.Item arrow="horizontal">
                                <Badge>
                                    <div className='pkListItem'>
                                        <div className='initiate'>
                                            <div className='initiateName'>{rowData.PKAUserName}</div>
                                        </div>
                                        <div className='dateWrap'>
                                            <span className='startDate'>{rowData.StartDate}</span>
                                            <span className='endDate'>{rowData.EndDate}</span>
                                        </div>
                                        <div className='receive'>
                                            <div className='receiveName'>{rowData.PKBUserName}</div>
                                            <div className='receiveState'>{this.getPkAccept(rowData.PKAccept)}</div>
                                        </div>
                                    </div>
                                </Badge>

                            </List.Item>
                            <div className='pkListInner' style={this.getBgColor(rowData.PKAccept,rowData.RunDistanceA,rowData.RunDistanceB).innerBg}>
                                <div className="barContro_space">
                                    <span className="vader"
                                          style={this.getBgColor(rowData.PKAccept,rowData.RunDistanceA,rowData.RunDistanceB).vaderWh}>
                                    </span>
                                </div>
                            </div>
                        </Link>
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
                    onReset={this.onReset}
                    onClickBtn={this.onClickBtn}
                />
                <div className="pkActiveBox">
                    <span className='iconfont icon-bianji' onClick={() => operation([
                        {
                            text: '新建', onPress: () => {
                                this.props.history.push('/pk/newpersonalpk')
                            }
                        },
                        {
                            text: '筛选', onPress: () =>{
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
                    key={0}
                    dataSource={this.state.dataSource}
                    ref={el => this.lv2 = el}

                    renderFooter={() => (<div className="loadFooter">
                        {this.state.isLoading ? '正在加载...' : '真的没有了'}
                    </div>)}
                    style={{
                        height: this.state.height
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
            </div>)
    }
}

const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({
    changeSelectShows() {
        dispatch()
    }
})
export default connect(mapState, mapDispatch)(withRouter(PkList));