import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PullToRefresh, ListView, Toast, List, Badge, Modal} from 'antd-mobile';
import ReactDOM from 'react-dom';
import "./index.less";
import * as req from '../../../request';
import {baseUrl} from './../../../request';
import Search from './../../../component/search';
const operation = Modal.operation;
class AdjustmentList extends Component {
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
            showMask: false,
            searchData: undefined
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
    getActivityList(activityDateNum = 0) {
        let dataInfo = {

            ActivityDateNum: activityDateNum,
            ParameterCode: '',
            PageIndex:this.state.pageNo,
            PageSize:this.state.pageSize,
        }
        req.post('/api/AdjustedData/ActivityList', dataInfo).then((res) => {
            let activityList = [...this.state.activityList, ...res.PageList];
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
        const {searchData} = this.state;
        this.setState({
            pageNo: 1,
            totalPage: 0,
            activityList: [],
        },()=>{
            this.getActivityList(searchData);
        })
    };

    // 加载更多
    onEndReached = () => {
        const {searchData} = this.state;
        if (this.state.isLoading || (this.state.totalPage < this.state.pageNo)) {
            Toast.hide();
            return;
        }
        this.setState({
            isLoading: true,
        },()=>{
            this.getActivityList(searchData)
        });
    };
    onClose = (msg) =>{
        this.setState({
            showMask:msg.showMask
        })
    }
    onConfirm = (options) =>{
        const [adjustDate] = options;
        let {searchData} = this.state;
        searchData = adjustDate ? adjustDate.label : adjustDate;
        this.setState({
            pageNo: 1,
            totalPage: 0,
            activityList: [],
            searchData
        }, () => {
            this.getActivityList(searchData);
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
                    value:'本周内',
                    label:1
                },
                {
                    value:'本月内',
                    label:2
                },
                {
                    value:'本季度',
                    label:3
                }
            ],
            id:1
        }]
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
                <Search
                    data={searchData}
                    showMask={this.state.showMask}
                    onClose={this.onClose}
                    onOk={this.onConfirm}
                />
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
                                        this.setState({
                                            showMask:true
                                        })
                                    }
                                },
                            ])}
                        />
                        ) : (
                            <span className="iconfont icon-bianji" onClick={() => operation([
                                {
                                    text: '筛选', onPress: () => {
                                        this.setState({
                                            showMask:true
                                        })
                                    }
                                },
                            ])}
                        />
                        )
                    }
                    
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

})

export default connect(mapState,mapDispatch)(AdjustmentList);
