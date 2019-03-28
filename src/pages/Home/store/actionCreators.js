import * as req from '../../../request';
import * as constants from './constants';
import { fromJS } from 'immutable';
/**
 * @Description: 查询上周运动排行
 * @author YanMing Liu
 * @date 2019/3/27
*/
const changeRankData = (sportRank) =>({
    type:constants.CHANGE_RANK_LIST,
    data:fromJS(sportRank)
})
export const getRankData = () => {
    return (dispatch) =>{
        req.post('/api/RunData/LastWeekRankingList')
            .then((res) => {

                dispatch(changeRankData(res))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
/**
 * @Description: 查询本月排行
 * @author YanMing Liu
 * @date 2019/3/27
*/
const changeThisMouthRank = (monthRank) => ({
    type:constants.CHANGE_THIS_MONTH_RANK,
    monthRank:fromJS(monthRank)
})
export const getThisMonthRank = () =>{
    return (dispatch) => {
        req.post('/api/RunData/MonthlyBestSellers')
            .then((res) => {
                dispatch(changeThisMouthRank(res))
            })
    }
}

/**
 * @Description: 查询本季度排行
 * @author YanMing Liu
 * @date 2019/3/28
*/
const changeThisQuarterRank = (thisQuarterRank) => ({
    type:constants.CHANGE_THIS_QUARTER_RANK,
    thisQuarterRank:fromJS(thisQuarterRank)
})
export const getThisQuarterRank = () =>{
    return (dispatch) => {
        req.post('/api/RunData/QuarterlyRanking')
            .then((res) =>{
                dispatch(changeThisQuarterRank(res))
            })
    }
}
/**
 * @Description: 查询上季度排行
 * @author YanMing Liu
 * @date 2019/3/28
*/
const changeLastQuarterRank = (lastQuarterRank) =>({
    type:constants.CHANGE_LAST_QUARTER_RANK,
    lastQuarterRank:fromJS(lastQuarterRank)
})
export const getLastQuarterRank = () =>{
    return (dispatch) => {
        req.post('/api/RunData/LastQuarterRanking')
            .then((res) =>{
                dispatch(changeLastQuarterRank(res))
            })
    }
}