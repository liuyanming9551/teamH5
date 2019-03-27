import axios from 'axios';
import * as req from '../../../request'
import * as constants from './constants';
/**
 * @Description: 用户上传运动数据接口
 * @author YanMing Liu
 * @date 2019/3/13
*/
const changeUploadState = () => ({
    type:constants.CHANGE_UPLOAD_STATE
})
export const addSport = (sportData) =>{
    return (dispatch) =>{
        axios.post('/api/RunData/AddRunDataRunDataImg',sportData)
        .then((res) => {
            const result = res.data;
            if(result.IsSuccess){
                dispatch(changeUploadState())
            }
        })
        .catch((res) => {

        })
    }
}



/**
 * @Description: 用户查看运动详情
 * @author YanMing Liu
 * @date 2019/3/13
*/
const changeSportDetail = (detail) =>({
    type:constants.CHANGE_DETAIL,
    detail
})

export const getSportDetail = (detailData) =>{
    return (dispatch) => {
        req.post('/api/RunData/RunDataDetails',{
            RunDataCode:detailData
            })
            .then((res)=>{
                console.log(res);
                dispatch(changeSportDetail(res))
            })
            .catch((res)=>{
                console.log(res)
            })
    }
}
/**
 * @Description: 取消图片上传状态
 * @author YanMing Liu
 * @date 2019/3/14
*/
export const cancelUploadState = () => ({
    type:constants.CANCEL_UPLOAD_STATE
})
/**
 * @Description: 获取用户权限
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeSportControl = () =>({
    type:constants.CHANGE_SPORT_CONTROL
})

export const getSportControl = (userCode) =>{
    return (dispatch) =>{
        req.post('/api/User/AuthorityJudgement',{
            UserCode:userCode
        })
        .then((res) => {
            if(res === true){
                dispatch(changeSportControl())
            }
        })
    }
}
/**
 * @Description: 获取待审核列表
 * @author YanMing Liu
 * @date 2019/3/14
*/
const changeCheckList = (checkListData) =>({
    type:constants.CHANGE_CHECK_LIST,
    checkListData
})
export const getCheckList = (userCode) =>{
    return (dispatch) =>{
        req.post('/api/RunData/AuditList',{
            UserCode:userCode
        }).then((res)=>{
            dispatch(changeCheckList(res))
        })
    }
}
const changeCheckState = (result) =>({
    type:constants.CHANGE_CHECK_STATE
})
export const checkSportData = (sportData) =>{
    return (dispatch) =>{
        req.post('/api/RunData/BatchAudit',sportData)
            .then((res)=>{
                if(res.IsSuccess){
                    dispatch(changeCheckState())
                }
            })
    }
}
export const cancelCheckedState = () => ({
    type:constants.CANCEL_CHECKED_STATE
})

/**
 * @Description: 获取所有人及usercode接口
 * @author maxiaomin
 * @date 2019/3/26
*/
const changeAllUsers = (result) => ({
    type:constants.GET_ALL_USERS,
    result
})
export const getAllUsers = () =>{
    return (dispatch) =>{
        req.get('/api/user/GetALLUsers')
        .then((res) => {
            const result = res.poepleList;
            
            if(res.code === 1001){
                dispatch(changeAllUsers(result))
            }
        })
        .catch((res) => {

        })
    }
}

/**
 * @Description: 获取活动类型接口
 * @author maxiaomin
 * @date 2019/3/26
*/
const changeActivityType = (result) => ({
    type:constants.GET_ACTIVITY_TYPE,
    result
})
export const getActivityType = () =>{
    return (dispatch) =>{
        req.get('/api/Parameter/ActivityCategory')
        .then((res) => {
            const result = res.poepleList;
            
            if(res.code === 1001){
                dispatch(changeActivityType(result))
            }
        })
        .catch((res) => {

        })
    }
}


/**
 * @Description: 新建额外运动接口
 * @author maxiaomin
 * @date 2019/3/26
*/
const changeAdjustSport = (result) => ({
    type:constants.GET_ACTIVITY_TYPE,
    result
})
export const addAdjustSport = () =>{
    return (dispatch) =>{
        req.get('/api/AdjustedData/AddAdjustedData')
        .then((res) => {
            const result = res;
            
            if(res.code === 1001){
                dispatch(changeAdjustSport(result))
            }
        })
        .catch((res) => {

        })
    }
}