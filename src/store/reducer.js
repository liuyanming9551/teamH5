import { combineReducers } from 'redux-immutable';
import {reducer as homeReducer} from './../pages/Home/store'

const reducer = combineReducers({
    home:homeReducer
});

export default reducer;
