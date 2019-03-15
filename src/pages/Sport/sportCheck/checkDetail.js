import React,{Component} from 'react';
import {Checkbox, List, WhiteSpace, WingBlank, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {baseUrl} from './../../../request';
import Zmage from 'react-zmage';
import {actionCreators} from "../store";
import {Map} from "immutable";
const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;
class CheckDetail extends Component{
    componentDidMount() {
        const dataCode = this.props.match.params.code;
        const {getCheckDetail} = this.props;
        getCheckDetail(dataCode)
    }

    onActiveBtn = (state) =>{
        const dataCode = this.props.match.params.code;
        const {checkSportData} = this.props;
        let sportData = {
            DataCodeArray:[dataCode],
            AuditStatus:state
        }
        checkSportData(sportData)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isCheck,history,cancelIsCheckState} = this.props
        if(isCheck){
            Toast.success('审核成功',2,function(){
                history.goBack()
                cancelIsCheckState()
            },true)
        }
    }


    render(){
        const {sportDetailData} = this.props;
        let detailData = ''
        let imgList = ''
        if(sportDetailData){
            detailData  = Map(sportDetailData);
            imgList = detailData.get('RunDataImgList').toJS();
        }
        return (
            <div>
                <List className="my-list">
                    <Item extra={detailData?detailData.get("UserName"):''}>姓名</Item>
                    <Item extra={detailData?detailData.get("RunDate"):''}>跑步日期</Item>
                    <Item extra={detailData?detailData.get("RunTimeLong"):''}>时长分钟</Item>
                    <Item extra={detailData?detailData.get("RunDistance"):''}>距离（KM）</Item>
                    <Item extra={detailData?detailData.get("RunSpeed"):''}>跑步配速</Item>
                    <Item>上传图片</Item>
                </List>
                <WhiteSpace size='lg' />
                <div className="imgViewList">
                    <WingBlank>
                        {
                            imgList?imgList.map(function (item,index) {
                                return (
                                    <Zmage key={item.ImgUrl} src={`${baseUrl}/${item.ImgUrl}`} />
                                )
                            }):''
                        }

                    </WingBlank>
                </div>
                <div className='activeWrap'>
                        <div className='activeGroup'>
                            <Button type="primary" inline size="small" style={{ marginRight: '8px' }} onClick={() => this.onActiveBtn(1)}>通过</Button>
                            <Button type="warning" inline size="small" style={{ marginRight: '8px' }} onClick={() => this.onActiveBtn(2)}>不通过</Button>
                            <Button type="primary" inline size="small" className='query' onClick={() => this.onActiveBtn(3)}>疑问</Button>
                        </div>
                </div>
            </div>
        )
    }
}
const mapState = (state) => ({
    sportDetailData:state.getIn(['sport','sportDetailData']),
    isCheck:state.getIn(['sport','isCheck'])
})
const mapDispatch = (dispatch) => ({
    getCheckDetail(detailData){
        dispatch(actionCreators.getSportDetail(detailData))
    },
    checkSportData(sportData){
        dispatch(actionCreators.checkSportData(sportData))
    },
    cancelIsCheckState(){
        dispatch(actionCreators.cancelCheckedState())
    }
})
export default connect(mapState,mapDispatch)(CheckDetail)