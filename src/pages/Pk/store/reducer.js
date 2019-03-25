import {fromJS} from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    pkPeopleList:[]
})
/**
 * @Description:获取可PK人的列表
 * @author YanMing Liu
 * @date 2019/3/25
*/
const changePkPeople = (state,action) =>{
    return state.merge({
        pkPeopleList: fromJS(action.pkPeopleList)
    })
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGEPKPEOPLE:
            return changePkPeople(state,action)
        default :
            return state;
    }
}