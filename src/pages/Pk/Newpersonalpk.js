import React from "react";
import { NavBar, Icon, DatePicker, List, Button, TextareaItem, InputItem } from 'antd-mobile';
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
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Button type="primary" inline size="small" style={{ marginRight: '2px' }}>新建</Button>,
                ]}
            >新建个人PK</NavBar>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">发起日期</List.Item>
                </DatePicker>
                <DatePicker
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">结束日期</List.Item>
                </DatePicker>
            </List>
            <List>
                <InputItem
                    placeholder="请输入您所要PK的姓名"
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>姓名：</div></InputItem>
            </List>
            <List>
                <TextareaItem
                    title="PK奖励"
                    placeholder="请输入您的赌注"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    autoHeight
                />
            </List>
            <div style={{ paddingTop: '7.5rem' }}>
                <Button type="primary" inline style={{ width: "49%" }}>重置</Button> <Button type="primary" inline style={{ width: "49%" }}>确定</Button>
            </div>
        </div>
    }
}