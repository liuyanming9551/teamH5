import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    sportRank:[],
    thisMonthRank:[],
    thisQuarterRank:[],
    lastQuarterRank:[]
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_RANK_LIST:
            return state.merge({
                sportRank:action.data
            })
        case constants.CHANGE_THIS_MONTH_RANK:
            return state.merge({
                thisMonthRank:action.monthRank
            })
        case constants.CHANGE_THIS_QUARTER_RANK:
            return state.merge({
                thisQuarterRank:action.thisQuarterRank
            })
        case constants.CHANGE_LAST_QUARTER_RANK:
            return state.merge({
                lastQuarterRank:action.lastQuarterRank
            })
        default:
            return state;
    }
}