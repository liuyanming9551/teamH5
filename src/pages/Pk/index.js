import React, {Component} from 'react';
import * as req from '../../request';
import {Link} from "react-router-dom";
import {Modal, List, Badge, ListView, Toast, PullToRefresh} from 'antd-mobile';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import './index.less';


const operation = Modal.operation;

class Pk extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row3, row4) => row3 !== row4,
        });
        this.state = {
            couponList: [],
            pageNo: 1,
            pageSize: 10, // 分页size
            totalPage: 0, // 总页数初始化
            isShowContent: false, // 控制页面再数据请求后显示
            refreshing: true, // 是否显示刷新状态
            dataSource,
            isLoading: false, // 是否显示加载状态
            height: document.documentElement.clientHeight,
            selectShows:false
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
            GroupId: 0,
            PKStatus: 3,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
        req.post('/api/PK/PersonalPKList', dataInfo).then((res) => {
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
            console.log(res)

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
    getPkAccept(pKAccept){
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

    row = (rowData, sectionID, rowID) => {
        let queryInfo = {pkCode:rowData.PKCode,pkAccept:rowData.PKAccept};
        let path = {
            pathname:'/pk/personallook',
            query:queryInfo,
        }
        return (
            <div key={rowID} style={{margin: '10px 0', background: '#fff'}}>
                <List>
                    <Link to={path}>
                        <List.Item arrow="horizontal">
                            <Badge>
                                <div className='pkListItem'>
                                    <div className='initiate'>
                                        <div className='initiateName'>{rowData.PKBName}</div>
                                    </div>
                                    <div className='dateWrap'>
                                        <span className='startDate'>{rowData.StartDate}</span>
                                        <span className='endDate'>{rowData.EndDate}</span>
                                    </div>
                                    <div className='receive'>
                                        <div className='receiveName'>{rowData.PKAName}</div>
                                        <div className='receiveState'>{this.getPkAccept(rowData.PKAccept)}</div>
                                    </div>
                                </div>
                            </Badge>
                        </List.Item>
                    </Link>
                </List>
            </div>
        );
    };
    render() {
        const {selectShows} = this.state;
        return (
            <div className="listview-wrap">
                <div className='selectInfoWrap' style={selectShows?{'display':'block'}:{'display':'none'}}>

                </div>
                <div className="pkActiveBox">
                    <span className='iconfont icon-bianji' onClick={() => operation([
                        {
                            text: '新建', onPress: () => {
                                this.props.location.history.push('/pk/newpersonalpk')
                            }
                        },
                        {
                            text: '筛选', onPress: () => {
                               this.setState({
                                   selectShows:true
                               },() =>{
                                   console.log(this.state.selectShows)
                               })
                            }
                        },
                    ])}
                    />
                </div>
                <ListView
                    key={1}
                    dataSource={this.state.dataSource}
                    ref={el => this.lv2 = el}

                    renderFooter={() => (<div className="loadFooter">
                        {this.state.isLoading ? '正在加载...' : '真的没有了'}
                    </div>)}
                    style={{
                        height: this.state.height,
                    }}
                    renderRow={this.row}
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

const mapState = (state) => ({

})
const mapDispatch = (dispatch) => ({
    changeSelectShows(){
        dispatch()
    }
})
export default connect(mapState, mapDispatch)(Pk);