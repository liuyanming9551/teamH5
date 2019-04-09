import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    hisInformation:'',
    hisSportData: '',
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.GET_HIS_INFO:
            return state.merge({
                hisInformation: fromJS(action.data)
            });
        case constants.GET_HIS_SPORT_DATA:
            return state.merge({
                hisSportData: fromJS(action.data)
            });
        default:
            return state;
    }
}