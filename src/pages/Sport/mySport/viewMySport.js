import React,{Component} from 'react';
import { List,WhiteSpace,WingBlank } from 'antd-mobile';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {Map} from 'immutable';
import {baseUrl} from './../../../request';
import ImageSlides from 'react-imageslides';
const Item = List.Item;
class ViewMySport extends Component{
     constructor(props){
         super(props)
         this.state = {
             isOpen: false
         }
     }
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
    handleOpen = () => {
        this.setState({
            isOpen: true,
        });
    };
    handleClose = () => {
        this.setState({
            isOpen: false,
        });
    };
    render(){
         const {sportDetailData} = this.props;
         let detailData = ''
         let imgList = ''
         let newImgList = []
         if(sportDetailData){
             detailData  = Map(sportDetailData);
             imgList = detailData.get('RunDataImgArray').toJS();
             imgList.forEach((item) => {
                 newImgList.push(`${baseUrl}/${item}`)
             })

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
                        <ImageSlides images={newImgList?newImgList:''} isOpen={this.state.isOpen} onClose={this.handleClose} />
                        {

                            newImgList?newImgList.map((item) =>{
                                return (
                                    <img key={item}
                                         src={item}
                                         onClick={this.handleOpen}
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