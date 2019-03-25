import React from 'react'
import * as req from '../../request'
// import Newpersonalk from "./Newpersonalpk"
// import PersonalLook from "./PersonalLook"
// import Personaselect from "./Personalselect"
import {Link} from "react-router-dom";
import {Modal, List, Badge, ListView, Toast, PullToRefresh} from 'antd-mobile';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';


const operation = Modal.operation;

class Pk extends React.Component {
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

    //获取列表
    requestCouponsList() {
        let dataInfo = {
            RunDateNum: 0,
            UserCode: "B7AF1D6B-964A-4EDB-9F02-5324F71CDBEE",
            AuditStatus: 4,
            PageIndex: this.state.pageNo,
            PageSize: this.state.pageSize
        }
        req.post('/api/PK/PersonalPKList',dataInfo).then((res) => {
            let couponList = [...this.state.couponList, ...res.PageList];
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
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} style={{margin: '10px 0', background: '#fff'}}>
                    <List className="my-list" style={{textAlign: 'center'}}>
                        <Link to='/pk/personallook'>
                            <List.Item arrow="horizontal">
                                <Badge text={0} style={{marginLeft: "12px"}}>
                                    <span style={{fontSize: "16px"}}>刘然</span>
                                    <span style={{fontSize: "16px", marginLeft: '20px'}}>2019-2-18</span>
                                    <span style={{fontSize: "16px", marginLeft: '16px'}}>2019-2-18</span>
                                </Badge>
                                <div style={{float: "right", fontSize: "12px"}}>
                                    <span>康贝</span><br/>
                                    <span style={{color: 'red', display: 'inlineBlock', marginTop: '10px'}}>进行中</span>
                                </div>
                            </List.Item>
                        </Link>
                    </List>
                </div>
            );
        };
        return (<div>
            <div className="activeBtn">
                <span className='iconfont icon-bianji' onClick={() => operation([
                         {
                             text: '新建', onPress: () => {
                                 this.props.location.history.push('/pk/newpersonalpk')
                             }
                         },
                         {
                             text: '筛选', onPress: () => {
                                 this.props.location.history.push('/pk/personalselect')
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


        </div>)
    }
}

const mapState = (state) => ({

})
const mapDispatch = (dispatch) => ({

})
export default connect(mapState,mapDispatch)(Pk);