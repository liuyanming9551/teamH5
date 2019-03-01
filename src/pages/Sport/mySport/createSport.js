import React, {Component} from 'react';
import {DatePicker, List, InputItem, ImagePicker,Button,WingBlank} from 'antd-mobile';
import {createForm} from 'rc-form';

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


// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
const dataList = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class CreateSport extends Component {
    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
        type: 'money',
        files: dataList

    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        e.preventDefault();
        this.setState({
            files: this.state.files.concat({
                url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
                id: '3',
            }),
        });
    };
    onTabChange = (key) => {
        console.log(key);
    };

    render() {

        const {getFieldProps} = this.props.form;
        const {type, files} = this.state;
        return (
            <div style={{position:"relative"}}>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.date}
                        onChange={date => this.setState({date})}
                    >
                        <List.Item arrow="horizontal">跑步日期</List.Item>
                    </DatePicker>
                    <InputItem
                        type={type}
                        placeholder="请输入时长"
                        clear
                        onChange={(v) => {
                            console.log('onChange', v);
                        }}
                        onBlur={(v) => {
                            console.log('onBlur', v);
                        }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >时长(分钟)</InputItem>
                    <InputItem
                        type={type}
                        placeholder="请输入公里数"
                        clear
                        onChange={(v) => {
                            console.log('onChange', v);
                        }}
                        onBlur={(v) => {
                            console.log('onBlur', v);
                        }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >距离(公里)</InputItem>
                    <InputItem
                        type={type}
                        placeholder="请输入配速"
                        clear
                        onChange={(v) => {
                            console.log('onChange', v);
                        }}
                        onBlur={(v) => {
                            console.log('onBlur', v);
                        }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >跑步配速</InputItem>
                </List>

                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 5}
                    onAddImageClick={this.onAddImageClick}
                />
                <div className="activeBox">
                    <WingBlank size='lg' style={{overflow:"hidden"}}>
                        <Button type="ghost" inline  style={{ float:"left",width:"48%" }}>重置</Button>
                        <Button type="primary" inline  style={{ float:"right",width:"48%" }}>确认</Button>
                    </WingBlank>


                </div>
            </div>
        );
    }
}

const H5NumberInputExampleWrapper = createForm()(CreateSport);
export default H5NumberInputExampleWrapper
