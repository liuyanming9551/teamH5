import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    userInformation:"",
});

const changeUserInfo = (state, action) => {
    return state.merge({
        userInformation:fromJS(action.data)
    })
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.GET_HIS_INFO:
            return changeUserInfo(state, action);
        default:
            return state;
    }
}