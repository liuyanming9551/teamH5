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
            <div className="adjustDetail">
                <div className="detailTop">
                    <p className="detailTitle">
                        <span className="detailName">爬凤凰山</span>
                        <span>参加人数：3人</span>
                        <span>2019-03-25</span>
                    </p>
                    <p>
                        在一个阳光明媚、晴空万里的周末，小伙伴们相约一起去爬凤凰山。
                    </p>
                </div>
                <div className="detailPerson">
                    <p>
                        <span>李丽&nbsp;</span>
                        <span>20km</span>
                    </p>
                    <p>
                        <span>马晓敏&nbsp;</span>
                        <span>20km</span>
                    </p>
                    <p>
                        <span>李丽&nbsp;</span>
                        <span>20km</span>
                    </p>
                    <p>
                        <span>马晓敏&nbsp;</span>
                        <span>20km</span>
                    </p>
                    <p>
                        <span>刘艳明&nbsp;</span>
                        <span>20km</span>
                    </p>
                    <p>
                        <span>李丽&nbsp;</span>
                        <span>20km</span>
                    </p>
                </div>
                <WhiteSpace size='lg' />
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

export default connect(mapStateToProps,mapDispatchToProps)(adjustmentDetail)