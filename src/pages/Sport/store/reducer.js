import {fromJS} from "immutable";
import * as constants from './constants';
const defaultState = fromJS({
    sportUpload:false,
    sportDetailData:'',
    rightControl:false,
    sportCheckList:[],
    isCheck:false,
    allUsers: [],
    allTypes: []
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

const getAllUsers = (state, action) => {
    return state.merge({
        allUsers:fromJS(action.result)
    })
}

const getAllTypes = (state, action) => {
    return state.merge({
        allUsers:fromJS(action.result)
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
        case constants.GET_ACTIVITY_TYPE:
            return getAllTypes(state, action)
        default:
            return state;
    }
}
