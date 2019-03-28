import React from "react";
import {Button, List, Pagination, Icon, TextareaItem, WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {Map} from "immutable";
import {actionCreators} from './store';
const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};
const Item = List.Item;
class PersonalLook extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            page:1
        }
    }
    componentDidMount() {
        const {pkCode,pkAccept} = this.props.location.query;
        const { changePkDetail,changePkState } =this.props;
        console.log(pkAccept)
        const parmas = {
            PKCode:pkCode,
            PKAccept:1
        }
        if(pkAccept === 0){
            changePkState(parmas)
        }

        changePkDetail(pkCode)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {acceptPk,history,cancelPkStateSuccess,cancelPkStateReject,rejectPk} = this.props;
        if(acceptPk){
            Toast.success('请开始你们的表演!', 1);
            cancelPkStateSuccess()
            setTimeout(() =>{
                history.goBack();
            },1000)
        }
        if(rejectPk){
            Toast.success('来日再战!', 1);
            cancelPkStateReject()
            setTimeout(() =>{
                history.goBack();
            },1000)
        }
    }

    onPageBtn = (index) =>{
        this.setState({
            page:index
        })
    }
    handleReject = () => {
        const {pkCode} = this.props.location.query;
        const { changePkState } =this.props;
        const parmas = {
            PKCode:pkCode,
            PKAccept:3
        }
        changePkState(parmas)
    }
    handleAccept = () =>{
        const {pkCode} = this.props.location.query;
        const { changePkState } =this.props;
        const parmas = {
            PKCode:pkCode,
            PKAccept:2
        }
        changePkState(parmas)
    }
    /*
    * 1.只有自己进来查看详情才有 拒绝和接受 , 通过判断被挑战者的code 是不是当前人的code
    * 2.pk状态所有人都可以看,但是PK状态为0的时候不显示,状态为 1,2的时候 显示
    * 3.PK状态为1的时候显示vs图标,状态为2的时候显示 胜负平 3个状态的图标
    *
    * */
    getPkIcon(auditStatus) {
        switch (auditStatus) {
            case 0:
                return "pkUserNameItem iconfont icon-vs"
            case 1:
                return "pkUserNameItem iconfont icon-sheng1"
            case 2:
                return "pkUserNameItem iconfont icon-fu"
            case 3:
                return "pkUserNameItem iconfont icon-ping"
            default:
                return "出错了"
        }
    }
    getDetailArea(){
        const {userCode,pkDetail} = this.props;
        const {page} = this.state;
        let pkDetailData = '';
        let isOwn = false;
        let isPKList = false;
        if(pkDetail){
            pkDetailData = Map(pkDetail);
            console.log(pkDetailData.get('PKB'),userCode,pkDetailData.get('PKStatus'))
            if(pkDetailData.get('PKB') === userCode && (pkDetailData.get('PKAccept') === 0 || pkDetailData.get('PKAccept') === 1)){
                isOwn = true;
            }
            if(pkDetailData.get('PKAccept') === 2){
                isPKList = true;
            }
        }
        const newList = pkDetailData?pkDetailData.get('PKDataList').toJS():'';
        const pkDetailList = [];
        if (newList.length) {
            for (let i = (page - 1) * 5; i < page * 5; i++) {
                if(newList[i]){
                    pkDetailList.push(
                        <div key={newList[i].Id} className='pkDetailListWrap'>
                            <div className='pkItemDetail'>
                                <span className='pkItem'>{newList[i].StatisticalDate}</span>
                                <span className='pkItem'>{newList[i].PKADistance}</span>
                                <span className='pkItem'>{newList[i].PKBDistance}</span>
                            </div>
                        </div>
                    )
                }

            }
        }
        return(
            <div className='pkInner'>
                <div style={isOwn?{display:'block'}:{display:'none'}}>
                    <WhiteSpace size='lg'/>
                    <WingBlank size='lg' style={{overflow: "hidden"}}>
                        <Button type="ghost" size="small" inline style={{float: "left", width: "48%"}} onClick={this.handleReject}>拒绝</Button>
                        <Button type="primary" size="small" inline style={{float: "right", width: "48%"}} onClick={this.handleAccept}>接受</Button>
                    </WingBlank>
                </div>
                <div className='pkDetailWrap' style={isPKList?{display:'block'}:{display:'none'}}>
                    <WhiteSpace size='lg'/>
                    <div className='pkUserName'>
                        <span className='pkUserNameItem' style={{textAlign:'right'}}>{pkDetailData?pkDetailData.get('PKAName'):''}</span>
                        <span className={pkDetailData?this.getPkIcon(pkDetailData.get('PKResult')):''} style={{fontSize:'28px'}}></span>
                        <span className='pkUserNameItem' style={{textAlign:'left'}}>{pkDetailData?pkDetailData.get('PKBName'):''}</span>
                    </div>
                    {pkDetailList}
                    <Pagination total={Math.ceil(newList.length/5)}
                                className="custom-pagination-with-icon"
                                current={Math.ceil(newList.length/5)===0 ? 0 : 1}
                                onChange={this.onPageBtn}
                                locale={locale}
                    />
                </div>

            </div>
        )
    }
    getPkState(pkStatus) {
        switch (pkStatus) {
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
    render() {
        const {pkDetail} = this.props;
        let pkDetailData = '';
        if(pkDetail){
            pkDetailData = Map(pkDetail);
        }
        return (
            <div>
                <List>
                    <Item extra={pkDetailData?pkDetailData.get('PKAName'):''}>发起人</Item>
                    <Item extra={pkDetailData?pkDetailData.get('CreateTime'):''}>发起日期</Item>
                    <Item extra={pkDetailData?pkDetailData.get('EndDate'):''}>结束日期</Item>
                    <Item extra={pkDetailData?pkDetailData.get('PKBName'):''}>被挑战者</Item>

                    <Item extra={pkDetailData?pkDetailData.get('AdjustedDistance'):''}>发起人运动量（公里）</Item>
                    <TextareaItem
                        value={pkDetailData?pkDetailData.get('PKProfit'):''}
                        editable={false}
                        rows={3}
                        title={'PK奖励'}
                    />
                    <WhiteSpace size='md'/>
                    <Item extra={pkDetailData?this.getPkState(pkDetailData.get('PKAccept')):''}>状态</Item>
                </List>
                {this.getDetailArea()}

            </div>
        )
    }
}
const mapState = (state) =>({
    pkDetail:state.getIn(['pk','pkDetail']),
    userCode:state.getIn(['login','userCode']),
    acceptPk:state.getIn(['pk','acceptPk'])
})
const mapDispatch = (dispatch) =>({
    changePkDetail(pkCode){
        dispatch(actionCreators.getPkDetail(pkCode))
    },
    changePkState(pkState){
        dispatch(actionCreators.getPkDate(pkState))
    },
    cancelPkStateSuccess(){
        dispatch(actionCreators.cancelPkStateSuccess())
    },
    cancelPkStateReject(){
        dispatch(actionCreators.cancelPkStateReject())
    }
})
export default connect(mapState,mapDispatch)(PersonalLook);