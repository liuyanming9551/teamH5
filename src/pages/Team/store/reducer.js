import {fromJS} from 'immutable';
import * as contants from './constants';
const defaultState = fromJS({
    teamData:[],
    teamGroupList:[],
    personData:[],
    personGroupList:[]
})
const addTeamData = (state,action) =>{
    return state.merge({
        teamData:fromJS(action.resultTeamData),
        teamGroupList:fromJS(action.resultTeamNameList)
    })
}
const addPersonData = (state,action) =>{
    return state.merge({
        personData:fromJS(action.resultPersonData),
        personGroupList:fromJS(action.resultPersonNameList)
    })
}
export default (state = defaultState,action) => {
    switch(action.type){
        case contants.GET_TEAM_DATA:
            return addTeamData(state,action)
        case contants.GET_PERSON_DATA:
            return addPersonData(state,action)
        default:
            return state;
    }
}
