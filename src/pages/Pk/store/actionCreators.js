import * as req from './../../../request';
import * as constants from './constants';
const changePkPeopleList = (result) =>({
    type:constants.CHANGEPKPEOPLE,
    pkPeopleList:result
})
export const getAllUser = (userCode) => {
    return dispatch => {
        req.get('/api/user/GetPKUsers',{
            params: {
                userCode
            }
        }).then((res) =>{
            const result = res.poepleList;
            dispatch(changePkPeopleList(result))
        })
    }
}