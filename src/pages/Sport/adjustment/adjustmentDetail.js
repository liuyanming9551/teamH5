import React,{Component} from 'react';
import { List,WhiteSpace,WingBlank } from 'antd-mobile';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {Map} from 'immutable';
import {baseUrl} from './../../../request';
import Zmage from 'react-zmage';
const Item = List.Item;
class adjustmentDetail extends Component{
     componentDidMount(){
         const dataCode = this.props.match.params.code;
         this.props.getActivityDetail(dataCode);
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
        const {activityDetailData} = this.props;
        let detailData = ''
        let imgList = ''
        if(activityDetailData){
            detailData  = Map(activityDetailData);
            imgList = detailData.get('ActivityImgList').toJS();
        }
        console.log("detailData", detailData)
        return (
            <div className="adjustDetail">
                <div className="detailTop">
                    <p className="detailTitle">
                        <span className="detailName">{detailData ? detailData.get('ActivityName') : ''}</span>
                        <span>参加人数：{detailData ? detailData.get('Number') : ''}人</span>
                        <span>{detailData ? detailData.get('ActivityDate') : ''}</span>
                    </p>
                    <p>
                        {detailData ? detailData.get('ActivityRemark') : ''}
                    </p>
                </div>
                <div className="detailPerson">
                    {
                        detailData ? detailData.get('AdjustedDataList').map((item, index) => {
                            return (
                                <p>
                                    <span>{item ? item.get('UserName') : ''}&nbsp;</span>
                                    <span>{item ? item.get('AdjustedDistance') : ''}km</span>
                                </p>
                            )
                        }) : null
                    }
                </div>
                <WhiteSpace size='lg' />
                <div className="imgViewList">
                    <WingBlank>
                        {
                            imgList ? imgList.map(function (item,index) {
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
    activityDetailData: state.getIn(['sport', 'activityDetailData'])
})
const mapDispatchToProps = (dispatch) => ({
    getActivityDetail(detailData){
        dispatch(actionCreators.getActivityDetail(detailData))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(adjustmentDetail);