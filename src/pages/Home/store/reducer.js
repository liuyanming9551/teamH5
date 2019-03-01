import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    sportRank:[]
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_RANK_LIST:
            return state.merge({
                sportRank:action.data
            })
        default:
            return state;
    }

}