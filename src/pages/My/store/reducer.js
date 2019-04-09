import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    userInformation:"",
    isChangeSuccess:false,
    weekRank:'',
    cardInfo:'',
    myHonor: '',
    groupInfo:''
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

const changeMyHonor = (state,action) =>{
    return state.merge({
        myHonor:fromJS(action.myHonor)
    })
}

/**
 * @Description: 获取组信息
 * @author YanMing Liu
 * @date 2019/4/8
*/
const changeGroupData = (state,action) =>{
    return state.merge({
        groupInfo:fromJS(action.groupInfo)
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
        case constants.GET_MY_HONOR:
            return changeMyHonor(state,action);
        case constants.GET_GROUP_INFO:
            return changeGroupData(state,action)
        default:
            return state;
    }
}