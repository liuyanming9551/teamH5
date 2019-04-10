import * as req from './../../../request';
import * as constants from './constants';
const changePkPeopleList = (result) =>({
    type:constants.CHANGE_PK_PEOPLE,
    pkPeopleList:result
})
/**
 * @Description: 获取所有的用户（不包括当前用户）
 * @author YanMing Liu
 * @date 2019/3/26
*/
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
/**
 * @Description:新建PK
 * @author YanMing Liu
 * @date 2019/3/26
*/
const changeCreatePkSuccess = () =>({
    type:constants.CHANGE_CREATE_PK_SUCCESS
})
export const createPk = (pkInfo,cb) => {
    return (dispatch) => {
        req.post('/api/PK/AddPK',pkInfo).then((res) =>{
            if(res.code === 1001){
                dispatch(changeCreatePkSuccess())
            }
            cb && cb(res)
        })
    }
}
/**
 * @Description: 改变新建Pk状态
 * @author YanMing Liu
 * @date 2019/3/26
 */
export const cancelCreatePkSuccess = () =>({
    type:constants.CANCEL_CREATE_PK_SUCCESS
})
/**
 * @Description: 获取pk详情
 * @author YanMing Liu
 * @date 2019/3/27
*/
const changePkDetail = (pkDetail) =>({
    type:constants.CHANGE_PK_DETAIL,
    pkDetail
})
export const getPkDetail = (pkCode) =>{
    return (dispatch) => {
        req.post('/api/PK/PKDetails',{
            PKCode:pkCode
        }).then((res) => {
            if(res){
               dispatch(changePkDetail(res))
            }
        })
    }
}
/**
 * @Description: 修改PK状态
 * @author YanMing Liu
 * @date 2019/3/27
*/
const changePkState = () =>({
    type:constants.CHANGE_PK_STATE_SUCCESS
})
const rejectPkState = () =>({
    type:constants.CHANGE_PK_STATE_REJECT
})
export const getPkDate = (pkState) => {
    return (dispatch) => {
        req.post('/api/PK/UpdatePKAccept',pkState).then((res) =>{
            if(res.code === 1001){
                if(res.state === 2){
                    dispatch(changePkState())
                }
                if(res.state === 3) {
                    dispatch(rejectPkState())
                }
            }
        })
    }
}
/**
 * @Description: 取消 PK 接受状态
 * @author YanMing Liu
 * @date 2019/3/28
*/
export const cancelPkStateSuccess = () =>({
    type:constants.CANCEL_PK_STATE_SUCCESS
})
/**
 * @Description: 取消 pk 拒绝状态
 * @author YanMing Liu
 * @date 2019/3/28
*/
export const cancelPkStateReject = () =>({
    type:constants.CANCEL_PK_STATE_REJECT
})