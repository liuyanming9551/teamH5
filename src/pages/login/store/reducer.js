import { fromJS } from 'immutable';
const defaultState = fromJS({
    token:""
});
export default (state = defaultState, action) => {
    switch(action.type) {

        default:
            return state;
    }
}