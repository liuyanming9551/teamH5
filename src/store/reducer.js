import { combineReducers } from 'redux-immutable';
import {reducer as homeReducer} from './../pages/Home/store';
import {reducer as loginReducer} from './../pages/login/store';
import {reducer as sportReducer} from './../pages/Sport/store';
import {reducer as teamReducer} from './../pages/Team/store';
import {reducer as myReducer} from './../pages/My/store';
import {reducer as pkReducer} from './../pages/Pk/store';
import {reducer as hisReducer} from './../pages/His/store';
const reducer = combineReducers({
    home:homeReducer,
    sport:sportReducer,
    team:teamReducer,
    my:myReducer,
    login:loginReducer,
    pk:pkReducer,
    his:hisReducer
});

export default reducer;
