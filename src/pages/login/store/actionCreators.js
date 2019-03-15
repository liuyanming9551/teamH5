import axios from 'axios';
import * as constants from './constants';
import * as req from '../../../request';
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
        req.post("/api/User/EnquiryGroup").then((res)=>{
            let groupInfo = res.data;
            dispatch(changeGroupInfo(groupInfo))
        }).catch((res)=>{
            console.log(res)
        })
    }
}
export const getUser = (code) => {
    return (dispatch) => {
        req.get("/api/user/LoginOrCreateUser",{
            params:{
                code
            }
        })
            .then((res) => {
                dispatch(changeUserInfo(res))
            })
            .catch((res) => {
                console.log(res)
            })
    }

}
export const addUser = (userInfo) =>{
    return (dispatch) =>{
        req.post("/api/user/InsertUser", userInfo)
            .then((res) => {
                dispatch(addUserInfo(res))
            })
            .catch((res) => {
                console.log(res)
            })
    }
}