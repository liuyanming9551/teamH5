import * as req from '../../../request';
import * as constants from './constants';

// 获取他人信息
export function getHisInfo(data, callback) {
    return (dispatch) => {
        req.post('/api/User/WeChatUserInformation', data)
        .then((res) => {
            dispatch({
                type: constants.GET_HIS_INFO,
                data: res.wxUserInfo
            });
            callback && callback(res)
        })
        .catch((res) => {
            console.log(res)
        })
    }
}

// 获取他人运动数据

export function getHisSportData(data, callback) {
    return (dispatch) => {
        req.post('/api/RunData/MySportsStatistics', data)
        .then((res) => {
            dispatch({
                type: constants.GET_HIS_SPORT_DATA,
                data: res
            });
        })
        .catch((res) => {
            console.log(res)
        })
    }
}

// 添加评价
export function addComment(data, callback) {
    return (dispatch) => {
        req.post('/api/Evaluate/AddEvaluate', data)
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

// 点赞
export function addLike(data, callback) {
    return (dispatch) => {
        req.post('/api/Evaluate/UpdateEvaluateLikeNum', data)
        .then((res) => {
            dispatch({
                type: constants.ADD_LIKE,
                data: res
            });
            callback && callback(res)
        })
        .catch((res) => {
            console.log(res)
        })
    }
}
