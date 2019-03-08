import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';
const changeRankData = (sportRank) =>({
    type:constants.CHANGE_RANK_LIST,
    data:fromJS(sportRank)
})
export const getRankData = () => {
    return (dispatch) =>{
        axios.post("http://10.168.1.138:5656/api/RunData/LastWeekRankingList")
            .then((res) => {
                let result = res.data;
                dispatch(changeRankData(result))
            })
            .catch((error) => {
                console.log(error)
            })

    }
}