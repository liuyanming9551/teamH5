import axios from 'axios';
import * as constants from './constants';
import {fromJS} from "immutable";

const getTokenInfo = (token) => ({
    type:constants.GET_TOKEN_INFO,
    token:fromJS(token)
})
export const getToken = (cropid, corpsecret) => {
    return (dispatch) => {
        axios.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken", {
            params: {
                corpid: cropid,
                corpsecret: corpsecret
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((res) => {
                console.log(res)
            })
    }

}