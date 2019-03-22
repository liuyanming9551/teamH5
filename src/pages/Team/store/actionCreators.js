import axios from 'axios';
import * as constants from './constants';
const changeTeamData = (resultTeamData,resultTeamNameList) =>({
    type:constants.GET_TEAM_DATA,
    resultTeamData,
    resultTeamNameList
})
const changePersonData = (resultPersonData,resultPersonNameList) =>({
    type:constants.GET_PERSON_DATA,
    resultPersonData,
    resultPersonNameList
})
export const getTeamData = () => {
    return (dispatch) =>{
        axios.post("/api/Group/StatisticalGroup").then((res) =>{
            let dataList = res.data;
            //数据拼接成图表所要的格式
            const resultTeamData = []//重组数据集合
            const resultTeamNameList = []//组集合
            for(let i = 0;i<dataList.length;i++){
                let obj = {};
                    obj.name = dataList[i].TimeSlot;
                    let timePeriodStatistics = dataList[i].TimePeriodStatistics;
                    for(let j = 0;j<timePeriodStatistics.length;j++){
                        const groupName = timePeriodStatistics[j].GroupName;
                        const sportGroupNum = timePeriodStatistics[j].MotionDataStatistics;
                        obj[groupName] = sportGroupNum;
                    }
                    resultTeamData.push(obj)
            }
            for(let k = 0;k<dataList[0].TimePeriodStatistics.length;k++){
                resultTeamNameList.push(dataList[0].TimePeriodStatistics[k].GroupName)
            }
            dispatch(changeTeamData(resultTeamData,resultTeamNameList))
        }).catch((res)=>{
            console.log(res)
        })
    }
}
export const getPersonData = () => {
    return (dispatch) =>{
        axios.post("/api/User/StatisticalUser").then((res) =>{
            let dataList = res.data;
            //数据拼接成图表所要的格式
            const resultPersonData = []//重组数据集合
            const resultPersonNameList = []//组集合
            for(let i = 0; i<dataList.length;i++){
                let obj = {};
                obj.name = dataList[i].TimeSlot;
                let timePeriodStatistics = dataList[i].TimePeriodStatistics;
                for(let j = 0;j<timePeriodStatistics.length;j++){
                    const userName = timePeriodStatistics[j].UserName;
                    const sportPersonNum = timePeriodStatistics[j].MotionDataStatistics;
                    obj[userName] = sportPersonNum;
                }
                resultPersonData.push(obj)
            }
            for(let k = 0;k<dataList[0].TimePeriodStatistics.length;k++){
                resultPersonNameList.push(dataList[0].TimePeriodStatistics[k].UserName)
            }
            dispatch(changePersonData(resultPersonData,resultPersonNameList))
        }).catch((res)=>{
            console.log(res)
        })
    }
}