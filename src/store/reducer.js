import { combineReducers } from 'redux-immutable';
import {reducer as homeReducer} from './../pages/Home/store';
import {reducer as loginReducer} from './../pages/login/store';
const reducer = combineReducers({
    home:homeReducer,
    login:loginReducer
});

export default reducer;
