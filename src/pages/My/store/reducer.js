import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    userInformation:""
});
const changeUserInfo = (state,action) => {
    return state.merge({
        userInformation:fromJS(action.userInformation)
    })
}
export default (state = defaultState, action) => {
    console.log(action.userInformation)
    switch(action.type) {
        case constants.GET_USER_INFORMATION:
            return changeUserInfo(state,action)
        default:
            return state;
    }
}