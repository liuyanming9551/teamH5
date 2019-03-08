import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    stateCode:"",
    userModel:"",
    userCode:"",
    groupInfo:[],
    loginSuccess:''
});
const changeUsrData = (state,action) =>{
    return state.merge({
        stateCode:fromJS(action.stateCode),
        userModel:fromJS(action.userModel),
        userCode:fromJS(action.userCode)
    })
}
const changeGroupData = (state,action) =>{
    return state.merge({
        groupInfo:fromJS(action.groupInfo)
    })
}
const changeUserInfo = (state,action) =>{
    let loginSuccess = '';
    if(action.StatusCode === 1001){
        loginSuccess =true
    }else {
        loginSuccess =false
    }
    return state.merge({
        loginSuccess:fromJS(loginSuccess),
        userCode:fromJS(action.UserCode)
    })
}
export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.GET_USER_INFO:
            return changeUsrData(state,action)
        case constants.GET_GROUP_INFO:
            return changeGroupData(state,action)
        case constants.ADD_USER_INFO:
            return changeUserInfo(state,action)
        default:
            return state;
    }
}