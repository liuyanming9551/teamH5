import axios from 'axios';
import * as constants from './constants';
import {fromJS} from "immutable";

const changeUserInformation = (userInfo) => ({
    type:constants.GET_USER_INFORMATION,
    userInformation:userInfo
})
export const getUserInformation = (userCode) =>{
    return (dispatch) => {
        axios.post("http://10.168.1.115:8080/api/User/UserInformationEvaluate",userCode)
            .then((res) => {
                let userInfo =  res.data;
                dispatch(changeUserInformation(userInfo))
            })
            .catch((res) => {
                console.log(res)
            })
    }
}