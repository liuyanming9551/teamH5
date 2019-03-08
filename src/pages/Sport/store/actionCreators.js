import axios from 'axios';
import Qs from 'qs';
import * as constants from './constants';
const changeMySportList = (sportList) => ({
    type:constants.GET_MY_SPORT_LIST,
    sportList
})

export const getMySportList = (pageNo,pageSize) =>{
    let dataInfo = {
        RunDateNum:0,
        UserCode:"B7AF1D6B-964A-4EDB-9F02-5324F71CDBEE",
        AuditStatus:4,
        PageIndex:pageNo,
        PageSize:pageSize
    }
    return (dispatch) =>{
        axios({
            method:"post",
            url:"http://10.168.1.115:8080/api/RunData/MyMotionData",
            data:Qs.stringify(dataInfo)
        }).then((res)=>{
            let sportList = res.data;
            dispatch(changeMySportList(sportList))
        }).catch((res)=>{
            console.log(res)
        })
    }
}