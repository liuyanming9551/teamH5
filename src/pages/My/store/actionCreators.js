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
                    dispatch(changeUserDetail())
                }

            })
    }
}
export const cancelDetailState = () =>({
    type:constants.CANCEL_DETAIL_STATE
})

const changeWeekRank = (rankData) =>({
    type:constants.CHANGE_WEEK_RANK,
    rankData
})
export const getWeekRank = (userCode) =>{
    return (dispatch) =>{
        req.post("",userCode)
            .then((res) =>{
                //res数据
                let rankData = ''
                dispatch(changeWeekRank(rankData))
            })
    }
}
const changeCardInfo = (cardInfo) =>({
    type:constants.CHANGE_MY_SPORT_INFO,
    cardInfo
})
export const getMysportInfo = (userCode) =>{
    return(dispatch) => {
        req.post('',userCode).then((res) =>{
            let cardInfo = '';
            dispatch(changeCardInfo(cardInfo))
        })
    }
}