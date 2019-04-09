import {fromJS} from "immutable";
import * as constants from './constants';
import { getAdjustSportList } from "./actionCreators";
const defaultState = fromJS({
    sportUpload:false,
    sportDetailData:'',
    rightControl:false,
    sportCheckList:[],
    isCheck:false,
    allUsers: [],
    allTypes: [],
    activityDetailData: '',
    activityUpload: false,
    bannerData: '',
    mySportChartData:[]
})

/**
 * @Description: 查看运动数据列表详情
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeSportDetail = (state,action) => {
    return state.merge({
        sportDetailData:fromJS(action.detail)
    })
}
/**
 * @Description: 判断用户是否上传成功
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeUploadState = (state) =>{
    return state.merge({
        sportUpload:fromJS(true)
    })
}
/**
 * @Description: 取消图片上传状态
 * @author YanMing Liu
 * @date 2019/3/14
*/
const cancelUploadState = (state) =>{
    return state.set('sportUpload',false)
}
/**
 * @Description: 用户有管理员权限
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeSportControl = (state) =>{
    return state.set('rightControl',true)
}
/**
 * @Description: 获取审核列表数据
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeCheckList = (state,action) =>{
    return state.merge({
        sportCheckList:fromJS(action.checkListData)
    })
}
/**
 * @Description: 修改isCheck状态(isCheck判断管理员是否审核过数据)
 * @author YanMing Liu
 * @date 2019/3/15
*/
const changeCheckState = (state) =>{
    return state.set('isCheck',true)
}
const cancelCheckedState = (state) => {
    return state.set('isCheck',false)
}

// 获取所有人员
const getAllUsers = (state, action) => {
    return state.merge({
        allUsers:fromJS(action.result)
    })
}

// 获取活动类型
const getAllTypes = (state, action) => {
    return state.merge({
        allTypes:fromJS(action.result)
    })
}

/**
 * @Description: 判断activity是否上传成功
 * @author maxiaomin
 * @date 2019/3/27
*/
const changeUploadActivity = (state) =>{
    return state.merge({
        activityUpload:fromJS(true)
    })
}
/**
 * @Description: 取消activity图片上传状态
 * @author maxiaomin
 * @date 2019/3/27
*/
const cancelUploadActivity = (state) =>{
    return state.set('activityUpload',false)
}

// 查看活动详情
const changeActivity = (state, action) => {
    return state.merge({
        activityDetailData:fromJS(action.res)
    })
}
/**
 * @Description: 获取个人折线图数据
 * @author YanMing Liu
 * @date 2019/4/8
*/
const changeMySportChart = (state,action) => {
    return state.merge({
        mySportChartData:fromJS(action.chartData)
    })
}

const changeBannerData = (state, action) => {
    console.log("changeBannerData action", action)
    return state.merge({
        bannerData:fromJS(action.data)
    })
}

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_DETAIL:
            return changeSportDetail(state,action);
        case constants.CHANGE_UPLOAD_STATE:
            return changeUploadState(state);
        case constants.CANCEL_UPLOAD_STATE:
            return cancelUploadState(state);
        case constants.CHANGE_SPORT_CONTROL:
            return changeSportControl(state);
        case constants.CHANGE_CHECK_LIST:
            return changeCheckList(state,action)
        case constants.CHANGE_CHECK_STATE:
            return changeCheckState(state);
        case constants.CANCEL_CHECKED_STATE:
            return cancelCheckedState(state);
        case constants.GET_ALL_USERS:
            return getAllUsers(state, action);
        case constants.GET_ACTIVITY_TYPES:
            return getAllTypes(state, action);
        case constants.CHANGE_ACTIVITY_DETAIL:
            return changeActivity(state, action);
        case constants.CANCEL_UPLOAD_ACTIVITY:
            return cancelUploadActivity(state);
        case constants.CHANGE_UPLOAD_ACTIVITY:
            return changeUploadActivity(state);
        case constants.GET_BANNER_DATA:
            return changeBannerData(state, action);
        case constants.GET_MY_SPORT_CHART:
            return changeMySportChart(state,action)
        default:
            return state;
    }
}
