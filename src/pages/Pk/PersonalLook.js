import React from "react";
import {Button, List, Pagination, Icon, TextareaItem, WhiteSpace, WingBlank, Toast,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {Map} from "immutable";
import {actionCreators} from './store';
const Item = List.Item;
const alert = Modal.alert;
class PersonalLook extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const {pkCode,pkAccept,pKAUserCode,pKBUserCode,rejectionTimes} = this.props.location.query;
        const { changePkDetail,changePkState,userCode } =this.props;
        console.log(pkAccept)
        const parmas = {
            PKCode:pkCode,
            PKAccept:1,
            RejectionTimes:rejectionTimes,
            PKAUserCode:pKAUserCode,
            PKBUserCode:pKBUserCode
        }
        console.log(pKBUserCode,userCode)
        if(pkAccept === 0 && pKBUserCode === userCode){
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


    handleReject = () => {
        const {pkCode,pKAUserCode,pKBUserCode} = this.props.location.query;
        const { changePkState,pkDetail } =this.props;
        let rejectionTimes = '';
        if(pkDetail){
            rejectionTimes = Map(pkDetail).get('RejectionTimes')
        }
        const parmas = {
            PKCode:pkCode,
            PKAccept:3,
            RejectionTimes:++rejectionTimes,
            PKAUserCode:pKAUserCode,
            PKBUserCode:pKBUserCode
        }
        if(rejectionTimes >= 3){
            alert('拒绝超过3次，你将会被扣除2公里','确定拒绝?', [
                { text: '取消', onPress: () => {return false} },
                {
                    text: '确定',
                    onPress: () =>{
                        changePkState(parmas)
                    }

                },
            ])
        }else {
            changePkState(parmas)
        }


    }
    handleAccept = () =>{
        const {pkCode,pKAUserCode,pKBUserCode} = this.props.location.query;
        const { changePkState,pkDetail } =this.props;
        let rejectionTimes = '';
        if(pkDetail){
            rejectionTimes = Map(pkDetail).get('RejectionTimes')
        }
        const parmas = {
            PKCode:pkCode,
            PKAccept:2,
            RejectionTimes:rejectionTimes,
            PKAUserCode:pKAUserCode,
            PKBUserCode:pKBUserCode
        }
        changePkState(parmas)
    }
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
        let pkDetailData = '';
        let isOwn = false;
        let isPKList = false;
        if(pkDetail){
            pkDetailData = Map(pkDetail);
            console.log(pkDetailData.get('PKBUserCode'),userCode)
            if(pkDetailData.get('PKBUserCode') === userCode && (pkDetailData.get('PKAccept') === 0 || pkDetailData.get('PKAccept') === 1)){
                isOwn = true;
            }
            if(pkDetailData.get('PKAccept') === 2){
                isPKList = true;
            }
        }
        const newList = pkDetailData?pkDetailData.get('PKData').toJS():'';
        const pkDetailList = [];
        if (newList.length) {
            for (let i = 0 ; i < newList.length ; i++) {
                if(newList[i]){
                    pkDetailList.push(
                        <div key={newList[i].RunDate} className='pkDetailListWrap'>
                            <div className='pkItemDetail'>
                                <span className='pkItem'>{newList[i].RunDate}</span>
                                <span className='pkItem'>{newList[i].RunDistanceA}</span>
                                <span className='pkItem'>{newList[i].RunDistanceB}</span>
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
                        <Button type="warning" size="small" inline style={{float: "left", width: "48%"}} onClick={this.handleReject}>拒绝</Button>
                        <Button type="primary" size="small" inline style={{float: "right", width: "48%"}} onClick={this.handleAccept}>接受</Button>
                    </WingBlank>
                </div>
                <div className='pkDetailWrap' style={isPKList?{display:'block'}:{display:'none'}}>
                    <WhiteSpace size='lg'/>
                    <div className='pkUserName'>
                        <span className='pkUserNameItem' style={{textAlign:'right'}}>{pkDetailData?pkDetailData.get('PKAUserName'):''}</span>
                        <span className={pkDetailData?this.getPkIcon(pkDetailData.get('PKResult')):''} style={{fontSize:'28px'}}></span>
                        <span className='pkUserNameItem' style={{textAlign:'left'}}>{pkDetailData?pkDetailData.get('PKBUserName'):''}</span>
                    </div>
                    {pkDetailList}
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
                    <Item extra={pkDetailData?pkDetailData.get('PKAUserName'):''}>发起人</Item>
                    <Item extra={pkDetailData?pkDetailData.get('StartDate'):''}>发起日期</Item>
                    <Item extra={pkDetailData?pkDetailData.get('EndDate'):''}>结束日期</Item>
                    <Item extra={pkDetailData?pkDetailData.get('PKBUserName'):''}>被挑战者</Item>
                    <Item style={pkDetailData?pkDetailData.get('PKAAdjustedData')==="0"?{display:"none"}:{display:"block"}:{}} extra={pkDetailData?pkDetailData.get('PKAAdjustedData'):''}>挑战者运动量（公里）</Item>
                    <Item style={pkDetailData?pkDetailData.get('PKBAdjustedData')==="0"?{display:"none"}:{display:"block"}:{}} extra={pkDetailData?pkDetailData.get('PKBAdjustedData'):''}>被挑战者运动量（公里）</Item>
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
    acceptPk:state.getIn(['pk','acceptPk']),
    rejectPk:state.getIn(['pk','rejectPk'])
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