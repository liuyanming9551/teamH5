新建个人PK
import React from "react";
import { DatePicker, List, Button, TextareaItem, InputItem, WhiteSpace } from 'antd-mobile';
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

 
class Pk extends React.Component {
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
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">发起日期：</List.Item>
                </DatePicker>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">结束日期：</List.Item>
                </DatePicker>
            </List>
            <List>
                <InputItem
                    placeholder="请输入您所要PK的姓名"
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>姓名：</div></InputItem>
                <TextareaItem
                    title="Pk奖励："
                    placeholder="你的赌注是什么呢？"
                    data-seed="logId"
                    autoHeight
                    ref={el => this.customFocusInst = el}
                />
            </List>

            <div style={{ marginTop: '20px' }}>
                <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "6px", background: '#33a3f4', color: 'white' }} >确认</Button><WhiteSpace />
                <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "6px", background: '#33a3f4', color: 'white' }}>重置</Button><WhiteSpace />
            </div>
        </div>
    }
}