import axios from 'axios';
import * as req from '../../../request'
import * as constants from './constants';

/**
 * @Description: 用户上传运动数据接口
 * @author YanMing Liu
 * @date 2019/3/13
*/

export function addSport(sportData, callback) {
    return (dispatch) => {
        axios.post('/api/RunData/AddRunDataRunDataImg', sportData)
        .then((res) => {
            const result = res.data;
          if(result.IsSuccess){
            dispatch({
              type: constants.CHANGE_UPLOAD_STATE,
            });
          }
          callback && callback(result)
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
 * @Description: 取消activity图片上传状态
 * @author maxiaomin 
 * @date 2019/3/27
*/
export const cancelUploadActivity = () => ({
    type:constants.CANCEL_UPLOAD_ACTIVITY
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
 * @date 2019/3/27
*/
const changeActivityType = (result) => ({
    type:constants.GET_ACTIVITY_TYPES,
    result
})
export const getActivityType = () =>{
    return (dispatch) =>{
        req.post('/api/Parameter/ActivityCategory')
        .then((res) => {
            const result = res.ActivityCategoryList;
            
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
 * @date 2019/3/27
*/
// const changeUploadActivity = () => ({
//     type:constants.CHANGE_UPLOAD_ACTIVITY
// })
// export const addActivity = (activityData, callback) =>{
//     return (dispatch) =>{
//         axios.post('/api/AdjustedData/AddActivity',activityData)
//         .then((res) => {
//             const result = res.data;
//             if(result.IsSuccess){
//                 dispatch(changeUploadActivity())
//             }
//         })
//         .catch((res) => {

//         })
//     }
// }

export function addActivity(activityData, callback) {
    return (dispatch) => {
        axios.post('/api/AdjustedData/AddActivity', activityData)
        .then((res) => {
            const result = res.data;
          if(result.IsSuccess){
            dispatch({
              type: constants.CHANGE_UPLOAD_ACTIVITY
            });
          }
          callback && callback(result)
        })
        .catch((res) => {
        })
    }
  }

/**
 * @Description: 额外运动详情接口
 * @author maxiaomin
 * @date 2019/3/27
*/
const changeActivityDetail = (res) => ({
    type:constants.CHANGE_ACTIVITY_DETAIL,
    res
})
export const getActivityDetail = (detailData) =>{
    return (dispatch) => {
        req.post('/api/AdjustedData/ActivityModel',{
            ActivityCode: detailData
            })
            .then((res)=>{
                console.log(res);
                dispatch(changeActivityDetail(res))
            })
            .catch((res)=>{
                console.log(res)
            })
    }
}

/**
 * @Description: 获取轮播图片
 * @author maxiaomin
 * @date 2019/4/8
*/
export function getBannerData(callback) {
    return (dispatch) => {
        req.post('/api/AdjustedData/RotationPicture')
        .then((res) => {
            console.log("getBannerData res", res)
            dispatch({
              type: constants.GET_BANNER_DATA,
              data: res
            });
          callback && callback(res)
        })
        .catch((res) => {
        })
    }
}


/**
 * @Description: 个人折线图接口
 * @author YanMing Liu
 * @date 2019/4/8
*/
const changeMySportChart = (chartData) =>({
    type:constants.GET_MY_SPORT_CHART,
    chartData
})
export const getMySportChart = (userCode) =>{
    return (dispatch) =>{
        req.post('/api/RunData/MyLastExercise',{
            UserCode:userCode
        }).then((res)=>{
            dispatch(changeMySportChart(res))
        })
    }
}

/**
 * @Description: 删除我的运动
 * @author maxiaomin
 * @date 2019/4/9
*/
export const deleteRunData = (data, callback) => {
    return (dispatch) => {
        req.post('/api/RunData/DeleteRunData', data)
        .then((res) => {
            if(res){
                dispatch({
                    type: constants.DELETE_MY_SPORT
                });
            }
            callback && callback(res)
        })
        .catch((res) => {
        })
    }
  }