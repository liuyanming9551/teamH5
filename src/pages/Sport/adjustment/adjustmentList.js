import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PullToRefresh, ListView, Toast, List, Badge, Modal} from 'antd-mobile';
import ReactDOM from 'react-dom';
import "./index.less";
import axios from "axios";
import Qs from 'qs';
const operation = Modal.operation;
class AdjustmentList extends React.Component {
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
    // componentDidMount(){
    //     const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 50;
    //     this.requestCouponsList();
    //     this.setState({
    //         height:hei
    //     })
    // }

    // 获取列表
    requestCouponsList() {
        let dataInfo = {
            RunDateNum:0,
            UserCode:"B7AF1D6B-964A-4EDB-9F02-5324F71CDBEE",
            AuditStatus:4,
            PageIndex:this.state.pageNo,
            PageSize:this.state.pageSize
        }
        axios({
            method:"post",
            url:"/api/RunData/MyMotionData",
            data:Qs.stringify(dataInfo)
        }).then((res)=>{
            let result = res.data;
            let couponList = [...this.state.couponList, ...result.PageList];
            this.setState({
                isShowContent: true,
                pageNo: this.state.pageNo +1,
                couponList: couponList,
                dataSource: this.state.dataSource.cloneWithRows(couponList), // 数据源dataSource
                totalPage:2,
                refreshing: false,
                isLoading: false,
            }, () => {
                Toast.hide();
            });
        }).catch((res)=>{

        })

    }

    // 下拉刷新
    onRefresh = () => {
        Toast.loading();
        this.setState({
            pageNo: 0,
            totalPage: 0,
            couponList: [],
        },()=>{
            this.requestCouponsList();
        })
    };

    // 加载更多
    onEndReached = () => {
        if (this.state.isLoading || (this.state.totalPage < this.state.pageNo +1)) {
            Toast.hide();
            return;
        }
        this.setState({
            isLoading: true,
        },()=>{
            this.requestCouponsList()
        });
    };
    render() {
        const {rightControl} = this.props.rightControl;
        console.log("rightControl", this.props.rightControl)
        const row =  (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} style={{margin:'10px 0',background:'#fff'}}>
                    <List className="my-list" style={{textAlign: 'center'}}>
                        <List.Item>
                            <Badge text={0} style={{marginLeft: "12px",width:'100%'}}>
                                <div style={{width: '80vw'}}>
                                    <div style={{marginBottom:'10px',overflow:'hidden'}}>
                                        <span className="ad-name">丽丽</span>
                                        <span className="ad-time">2019-8-8</span>
                                    </div>
                                    <div style={{overflow:'hidden'}}>
                                        <span className="ad-state">待审核 ：<span>9km</span></span>
                                        <span className="ad-number">原因 ：<span>爬上爬上爬</span></span>
                                    </div>
                                </div>
                            </Badge>
                        </List.Item>
                    </List>
                </div>
            );
        } ;
        return (
            <div>
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
                        )
                    }
                    
                </div>
                <div className="list-wrap">
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
                </div>
                {/* <ListView
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
                /> */}
            </div>

        );
    }
}

const mapState = (state) => ({
    rightControl:state.getIn(['sport','rightControl'])
})
const mapDispatch = (dispatch) => ({
    // changeSportControl(userCode){
    //     dispatch(actionCreators.getSportControl(userCode))
    // }
})
export default connect(mapState,mapDispatch)(AdjustmentList);
