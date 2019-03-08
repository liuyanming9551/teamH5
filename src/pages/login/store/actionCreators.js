import axios from 'axios';
import * as constants from './constants';
import {fromJS} from "immutable";
//获取用户信息
const changeUserInfo = (userInfo) =>({
    type:constants.GET_USER_INFO,
    stateCode:userInfo.StatusCode,
    userModel:userInfo.userModel,
    userCode:userInfo.UserCode
})
//获取用户组
const changeGroupInfo = (groupInfo) =>({
    type: constants.GET_GROUP_INFO,
    groupInfo
})
//提交用户信息
const addUserInfo = (sertInfo) => ({
    type:constants.ADD_USER_INFO,
    sertInfo
})

export const getGroup = () =>{
    return (dispatch) =>{
        axios.post("http://10.168.1.138:5656/api/User/EnquiryGroup").then((res)=>{
            let groupInfo = res.data.data;
            dispatch(changeGroupInfo(groupInfo))
        }).catch((res)=>{
            console.log(res)
        })
    }
}
export const getUser = (code) => {
    return (dispatch) => {
        axios.get("http://10.168.1.138:5656/api/user/LoginOrCreateUser",{
            params:{
                code
            }
        })
        .then((res) => {
            let userInfo = res.data;
            dispatch(changeUserInfo(userInfo))
        })
        .catch((res) => {
            console.log(res)
        })
    }

}
export const addUser = (userInfo) =>{
    return (dispatch) =>{
        axios.post("http://10.168.1.138:5656/api/user/InsertUser",userInfo)
        .then((res) => {
            let userInfo = res.data;
            dispatch(addUserInfo(userInfo))

        })
        .catch((res) => {
            console.log(res)
        })
    }
}