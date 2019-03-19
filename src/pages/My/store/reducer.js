import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    userInformation:"",
    isChangeSuccess:false,
    weekRank:'',
    cardInfo:''
});
const changeUserInfo = (state,action) => {
    return state.merge({
        userInformation:fromJS(action.userInformation)
    })
}
const changeDetailState = (state) =>{
    return state.set('isChangeSuccess',true)
}
const cancelDetailState = (state) =>{
    return state.set('isChangeSuccess',false)
}
// const changeWeekRank = (state,action) =>{
//     return state.merge()
// }
const changeCardInfo = (state,action) =>{
    return state.merge({
        cardInfo:fromJS(action.cardInfo)
    })
}
export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.GET_USER_INFORMATION:
            return changeUserInfo(state,action);
        case constants.CHANGE_USER_DETAIL:
            return changeDetailState(state);
        case constants.CANCEL_DETAIL_STATE:
            return cancelDetailState(state);
        case constants.CHANGE_MY_SPORT_INFO:
            return changeCardInfo(state,action);
        default:
            return state;
    }
}