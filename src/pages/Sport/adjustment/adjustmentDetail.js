import React,{Component} from 'react';
import { WingBlank } from 'antd-mobile';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {Map} from 'immutable';
import {baseUrl} from './../../../request';
import ImageSlides from 'react-imageslides';
class adjustmentDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            chooseImgIndex:0
        }
    }
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
    handleOpen (index) {
        this.setState({
            isOpen: true,
            chooseImgIndex:index+1
        });
    };
    handleClose = () => {
        this.setState({
            isOpen: false,
            chooseImgIndex:0
        });
    };
    render(){
        const {activityDetailData} = this.props;
        let detailData = '';
        let imgList = '';
        let newImgList = [];
        if(activityDetailData){
            detailData  = Map(activityDetailData);
            imgList = detailData.get('ActivityImgArray').toJS();
            imgList.forEach((item) => {
                newImgList.push(`${baseUrl}/${item}`)
            })
        }
        console.log("detailData", detailData)
        return (
            <div className="adjustDetail">
                <div className="detailTop">
                    <p className="detailTitle">
                        <span className="detailName">{detailData ? detailData.get('ActivityName') : ''}</span>
                    </p>
                    <p className="detailNumber">
                        <span>{detailData ? detailData.get('ActivityDate') : ''}</span>
                        <span>参加人数：{detailData ? detailData.get('Number') : ''}人</span>
                    </p>
                    <p className="detailContent">
                        {detailData ? detailData.get('ActivityRemark') : ''}
                    </p>
                </div>
                <div className="detailPerson">
                    {
                        detailData ? detailData.get('AdjustedDataList').map((item, index) => {
                            return (
                                <p key={index}>
                                    <span>{item ? item.get('UserName') : ''}&nbsp;</span>
                                    <span>{item ? item.get('AdjustedDistance') : ''}km</span>
                                </p>
                            )
                        }) : null
                    }
                </div>
                <div className="imgViewList">
                    <WingBlank>
                        <ImageSlides images={newImgList?newImgList:''} index={this.state.chooseImgIndex} isOpen={this.state.isOpen} onClose={this.handleClose} />
                        {

                            newImgList?newImgList.map((item,index) =>{
                                return (
                                    <img key={item}
                                         src={item}
                                         onClick={this.handleOpen.bind(this,index)}
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