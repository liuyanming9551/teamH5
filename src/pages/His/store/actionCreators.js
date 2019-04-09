import * as req from '../../../request';
import * as constants from './constants';

// 获取他人信息
export function getHisInfo(userCode, callback) {
    return (dispatch) => {
        req.post('/api/User/UserInformationEvaluate', userCode)
        .then((res) => {
            dispatch({
                type: constants.GET_HIS_INFO,
                data: res
            });
            callback && callback(res)
        })
        .catch((res) => {
            console.log(res)
        })
    }
}

// 添加评价
export function addComment(userCode, callback) {
    return (dispatch) => {
        req.post('/api/User/UserInformationEvaluate', userCode)
        .then((res) => {
            dispatch({
                type: constants.ADD_COMMENT,
                data: res
            });
            callback && callback(res)
        })
        .catch((res) => {
            console.log(res)
        })
    }
}
