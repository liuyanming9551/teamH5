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
export const createPk = (pkInfo) => {
    return (dispatch) => {
        req.post('/api/PK/AddPK',pkInfo).then((res) =>{
            if(res.IsSuccess === true){
                dispatch(changeCreatePkSuccess())
            }
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