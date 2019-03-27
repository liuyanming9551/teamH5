import {fromJS} from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
    pkPeopleList:[],
    createPkSuccess:'',
    pkDetail:''
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
/**
 * @Description:createPkSuccess转态设置为true
 * @author YanMing Liu
 * @date 2019/3/26
*/
const changeCreatePkSuccess = (state) =>{
    return state.set('createPkSuccess',true)
}
/**
 * @Description: createPkSuccess转态设置为false
 * @author YanMing Liu
 * @date 2019/3/26
*/
const cancelCreatePkSuccess = (state) =>{
    return state.set('createPkSuccess',false);
}
/**
 * @Description: 获取pk详情
 * @author YanMing Liu
 * @date 2019/3/27
*/
const changePkDetail = (state,action) =>{
    return state.merge({
        pkDetail:fromJS(action.pkDetail)
    })
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_PK_PEOPLE:
            return changePkPeople(state,action);
        case constants.CHANGE_CREATE_PK_SUCCESS:
            return changeCreatePkSuccess(state);
        case constants.CANCEL_CREATE_PK_SUCCESS:
            return cancelCreatePkSuccess(state);
        case constants.CHANGE_PK_DETAIL:
            return changePkDetail(state,action)
        default :
            return state;
    }
}
