import * as req from '../../../request';
import * as constants from './constants';
const changeUserInformation = (userInfo) => ({
    type:constants.GET_USER_INFORMATION,
    userInformation:userInfo
})
export const getUserInformation = (userCode) =>{
    return (dispatch) => {
        req.post("/api/User/UserInformationEvaluate",userCode)
            .then((res) => {

                dispatch(changeUserInformation(res))
            })
            .catch((res) => {
                console.log(res)
            })
    }
}