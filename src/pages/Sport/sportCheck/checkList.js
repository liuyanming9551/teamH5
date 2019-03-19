import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, Checkbox, Badge,Button} from "antd-mobile";
import "./index.less";
import {Link} from "react-router-dom";
import {actionCreators} from './../store';

class SportCheck extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {changeCheckList,userCode} = this.props;
        changeCheckList(userCode);
    }
    render() {
        const {sportCheckList} =this.props;
        let checkListData = '';
        if(sportCheckList){
            checkListData = sportCheckList.toJS();
        }
        return (
            <div>
                <List className="my-list" style={{textAlign: 'center'}}>
                    {
                        checkListData?checkListData.map((item,index) =>{
                            return(
                                <div className='checkListWrap' key={index}>
                                    <Link to={`/sport/checkDetail/${item.DataCode}`}>
                                        <List.Item className='checkTitle'>

                                            <span className="checkUser">{item.UserName}</span>
                                            <span className="sportTips">当日已完成{item.DailyDistance}km</span>
                                        </List.Item>
                                        <List.Item arrow="horizontal">
                                            <Badge text={0}>
                                                <div className='checkInnerWrap'>
                                                    <div className='checkLeft'>
                                                        <div className="checkTime"> 时间 <span>{item.RunDate}</span></div>
                                                        <div className="checkKm">跑步距离：{item.RunDistance}km</div>
                                                    </div>
                                                    <div className='checkRight'>
                                                        <div className="checkDuring">跑步时间 ：<span>{item.RunTimeLong}分钟</span></div>
                                                        <div>跑步配速 ：<span>{item.RunSpeed}min/km</span></div>
                                                    </div>
                                                </div>
                                            </Badge>
                                        </List.Item>
                                    </Link>
                                </div>
                            )
                        }):''
                    }
                </List>
            </div>

        );
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    sportCheckList:state.getIn(['sport','sportCheckList'])
})
const mapDispatch = (dispatch) =>({
    changeCheckList(userCode){
        dispatch(actionCreators.getCheckList(userCode))
    },

})
export default connect(mapState,mapDispatch)(SportCheck)