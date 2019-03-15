import * as req from '../../../request';
import * as constants from './constants';
import { fromJS } from 'immutable';
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