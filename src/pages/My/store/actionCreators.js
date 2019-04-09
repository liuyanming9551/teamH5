import * as req from '../../../request';
import * as constants from './constants';
const changeUserInformation = (userInfo) => ({
    type:constants.GET_USER_INFORMATION,
    userInformation:userInfo,
})

export const getUserInformation = (userCode) =>{
    return (dispatch) => {
        req.post("/api/User/UserInformationEvaluate",userCode)
            .then((res) => {

                dispatch(changeUserInformation(res))
            })
            .catch((res) => {
                console.log(res)
            })
    }
}
const changeUserDetail = () =>({
    type:constants.CHANGE_USER_DETAIL,
})
export const changeUserDetailInfo = (detailValue) => {
    return (dispatch) =>{
        req.post('/api/User/UpdateUserSkill',detailValue)
            .then((res)=>{
                if(res === true){
                    console.log("执行")
                    dispatch(changeUserDetail())
                }

            })
    }
}
export const cancelDetailState = () =>({
    type:constants.CANCEL_DETAIL_STATE
})

// const changeWeekRank = (rankData) =>({
//     type:constants.CHANGE_WEEK_RANK,
//     rankData
// })
// export const getWeekRank = (userCode) =>{
//     return (dispatch) =>{
//         req.post("",userCode)
//             .then((res) =>{
//                 //res数据
//                 let rankData = ''
//                 dispatch(changeWeekRank(rankData))
//             })
//     }
// }
const changeCardInfo = (cardInfo) =>({
    type:constants.CHANGE_MY_SPORT_INFO,
    cardInfo
})
export const getMysportInfo = (userCode) =>{
    return(dispatch) => {
        req.post('/api/RunData/MySportsStatistics',userCode).then((res) =>{

            dispatch(changeCardInfo(res))
        })
    }
}

// 获取我的荣誉列表
// const getMyHonor = (res) => ({
//     type: constants.GET_MY_HONOR,
//     myHonor: res,
// })

// export const getMyHonorList = (userCode) =>{
//     return (dispatch) => {
//         req.post("/api/User/HonorBadge",userCode)
//             .then((res) => {

//                 dispatch(getMyHonor(res))
//             })
//             .catch((res) => {
//                 console.log(res)
//             })
//     }
// }

// 获取我的荣誉列表
export function getMyHonorList (userCode) {
    return (dispatch) => {
        req.post("/api/User/HonorBadge",userCode)
        .then((res) => {
            const result = res.data;
            if(result.IsSuccess){
                dispatch({
                  type: constants.GET_MY_HONOR,
                  myHonor: res
                });
              }
        })
        .catch((res) => {

        })
    }
}

//获取用户组
const changeGroupInfo = (groupInfo) =>({
    type: constants.GET_GROUP_INFO,
    groupInfo
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