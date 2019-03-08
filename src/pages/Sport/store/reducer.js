import {fromJS} from "immutable";
import * as contants from './constants';
import {ListView} from 'antd-mobile';
const defaultState = fromJS({
    mySportList:[],
    dataSource:new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    }),
})
function genData(pageIndex,NUM_ROWS) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pageIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

const addMySportList = (state,action) => {
    return state.merge({
        mySportList: action.sportList.PageList,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows(genData(0,action.sportList.PageList.length))
    })
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case contants.GET_MY_SPORT_LIST:
            return addMySportList(state,action)
        default:
            return state;
    }
}