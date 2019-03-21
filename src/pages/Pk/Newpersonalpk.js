// 新建个人PK
import React from "react";
import TestWrapper from "./namePicker"
import TextareaItemExampleWrapper from "./pkjiangli"
import { DatePicker, List, TextareaItem } from 'antd-mobile';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}


class Newpersonalpk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: now,
            time: now,
            utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            visible: false,
           
        }
    }
    render() {
        return <div>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">发起日期：</List.Item>
                </DatePicker>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">结束日期：</List.Item>
                </DatePicker>
                 {/* 选择名字 */}
                <TestWrapper/>
             <TextareaItemExampleWrapper/>
            </List>
             <div style={{ marginTop: '20px', display: 'flex' }}>
                <button style={{ width: '96%', borderRadius: "6px", background: '#33a3f4', color: 'white', border: 'none', height: '30px' }} >确认</button>
                <button style={{ width: '96%', borderRadius: "6px", background: '#33a3f4', color: 'white', border: 'none', height: '30px' }}>重置</button>
            </div> 
        </div>
    }
}
export default Newpersonalpk;