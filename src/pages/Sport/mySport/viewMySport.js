import React,{Component} from 'react';
import { List,WhiteSpace,WingBlank } from 'antd-mobile';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {Map} from 'immutable';
import {baseUrl} from './../../../request';
import Zmage from 'react-zmage';
const Item = List.Item;
 class ViewMySport extends Component{
     componentDidMount(){
         const dataCode = this.props.match.params.code;
         const {changeSportList} = this.props;
         changeSportList(dataCode)
     }
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
                <List  className="my-list">
                    <Item extra={detailData?detailData.get("RunDate"):''}>跑步日期</Item>
                    <Item extra={detailData?detailData.get("RunTimeLong"):''}>时长分钟</Item>
                    <Item extra={detailData?detailData.get("RunDistance"):''}>距离（KM）</Item>
                    <Item extra={detailData?detailData.get("RunSpeed"):''}>跑步配速</Item>
                    <Item extra={detailData?this.getCheckState(detailData.get("AuditStatus")):''}>审核状态</Item>
                    <Item>上传图片</Item>
                </List>
                <WhiteSpace size='sm' />
                <div className="imgViewList">
                    <WingBlank>
                        {
                            imgList?imgList.map(function (item,index) {
                                return (
                                    <Zmage key={item.ImgUrl}
                                           src={`${baseUrl}/${item.ImgUrl}`}
                                           controller={{
                                               // 关闭按钮
                                               close: true,
                                               // 缩放按钮
                                               zoom: true
                                           }}
                                    />
                                )
                            }):''
                        }

                    </WingBlank>
                </div>
            </div>
        )
    }
}
const mapStateToProps =  (state) => ({
    sportDetailData:state.getIn(['sport','sportDetailData'])
})
const mapDispatchToProps = (dispatch) => ({
    changeSportList(detailData){
        dispatch(actionCreators.getSportDetail(detailData))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ViewMySport)