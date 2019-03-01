import React, {Component} from 'react';

import { PullToRefresh, ListView, Button, Toast, List } from 'antd-mobile';
import ReactDOM from 'react-dom';
import "./index.less";
const Item = List.Item;

class SportList extends Component {
    constructor (props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        this.initData = props.dataList;
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false,
            height: document.documentElement.clientHeight,
            currentPage: 0,
            pageSize: 20,
            data: [],
            hasMore: true,
            isLoading: false
        };
        if(props.dataList.length < this.state.pageSize){
            this.state.hasMore = false
        }

    }

    componentDidMount() {
        this.renderResize();
        // Set the appropriate height
        setTimeout(() => this.setState({
            height: (this.state.height - 50 - 198 - 50) + "px",
        }), 0);

    }

    renderResize = () => {
        var width = document.documentElement.clientWidth;
        var height =  document.documentElement.clientHeight;
        if( width > height ){
            this.setState({
                height: (height - 50 - 198 - 50) + "px",
            })
        } else{
            this.setState({
                height: (height - 50 - 198 - 50) + "px",
            })

        }

    }

    componentWillMount(){
        window.addEventListener("resize", this.renderResize, false);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.renderResize, false);
    }


    onScroll = (e) => {
        this.st = e.scroller.getValues().top;
        this.domScroller = e;
    };

    getOutputList = () => {

        let params = {
            pageNo: this.state.currentPage++,
            pageSize: this.state.pageSize,
        }

        if(this.state.hasMore){
            // getOutputList (params).then((data) => {
            //     setTimeout(() => {
            //         if(data.dataList.length < this.state.pageSize){
            //             this.setState({
            //                 hasMore: false
            //             });
            //         }
            //         this.setState({
            //             dataSource: this.state.dataSource.cloneWithRows(this.initData.concat(data.dataList)),
            //             refreshing: false,
            //             isLoading: false,
            //             currentPage: params.pageNo
            //         });
            //         this.initData = data.dataList.concat(this.initData);
            //
            //     }, 600);
            //
            // }, (data) => {
            //     if (data.messageCode !== 'netError' && data.messageCode !== 'sysError' && data.messageCode !== 'timeout') {
            //         setTimeout(() => {
            //             this.setState({
            //                 refreshing: false,
            //                 isLoading: false,
            //             });
            //
            //         }, 600);
            //         Toast.info(data.message);
            //     }
            // });
        }else{
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                    isLoading: false,
                });

            }, 600);
        }

    }

    refreshList = () => {
        let params = {
            pageNo: 0,
            pageSize: this.state.pageSize,
        }
        // getOutputList(params).then((data) => {
        //
        //     if (data.dataList.length < this.state.pageSize) {
        //         this.setState({
        //             hasMore: false
        //         });
        //     } else {
        //         this.setState({
        //             hasMore: true
        //         });
        //     }
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(data.dataList),
        //         refreshing: false,
        //         isLoading: false,
        //         currentPage: params.pageNo
        //     });
        //     this.initData = data.dataList;
        //
        // }, (data) => {
        //     if (data.messageCode !== 'netError' && data.messageCode !== 'sysError' && data.messageCode !== 'timeout') {
        //         setTimeout(() => {
        //             this.setState({
        //                 refreshing: false,
        //                 isLoading: false,
        //             });
        //
        //         }, 600);
        //         Toast.info(data.message);
        //
        //         //commonInfo.hasLoading = true;
        //     }
        // });
    }

    onEndReached = (event) => {
        if (this.state.isLoading ) {
            return false;
        }
        if ( !this.state.hasMore) {
            return false;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.getOutputList();

        }, 1000);
    }

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }

        this.refreshList();

    };

// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps = (props) => {
        this.initData = props.dataList;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
        });
    }

    renderList() {
        const row = (dataRow) => {
            return (
                <div key={dataRow} className="one-output-item" >
                    {dataRow &&
                    <Item extra={dataRow.balanceAmount && dataRow.balanceAmount.toFixed(2)}>{dataRow.name}</Item>
                    }
                </div>


            )
        }
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderRow={row}
                initialListSize={this.state.pageSize}
                pageSize={this.state.pageSize}
                style={{
                    height: this.state.height,
                }}
                scrollerOptions={{ scrollbars: true }}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}
                renderFooter={() => (<p >
                    {this.state.hasMore ? '正在加载更多的数据...' : '已经全部加载完毕'}
                </p>)
                }
            />

        )
    }

    render() {

        return (
            <div>
                {this.renderList()}
            </div>

        );
    }
}
export default SportList