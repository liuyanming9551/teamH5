import React, {Component} from 'react';
import {DatePicker, List, InputItem, ImagePicker, Button, WingBlank, Toast} from 'antd-mobile';
import {connect} from "react-redux";
import {createForm} from 'rc-form';
import {actionCreators} from './../store';
import {compressImage} from './../../../util/util';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
const Item = List.Item;

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

class CreateSport extends Component {
    constructor(props){
        super(props)
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.onBlurTime = this.onBlurTime.bind(this);
        this.onBlurDistance = this.onBlurDistance.bind(this);
        this.state = {
            date: now,
            type: 'money',
            files: [],
            RunTimeLong: '',
            RunDistance: '',
        }
    }
    
    onChange = (files, type, index) => {
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        //e.preventDefault();
    };
    handleConfirm(){
        const {userCode,changeSport} = this.props;
        let {files, RunTimeLong, RunDistance} =this.state;
        const fieldsValue = this.props.form.getFieldsValue();
        const timeValue = fieldsValue.dp.toISOString().slice(0, 10)
        RunTimeLong = Number(RunTimeLong).toFixed(2);
        RunDistance = Number(RunDistance).toFixed(2)
        this.props.form.validateFields((err, values) => {
            console.log(Number(RunTimeLong),Number(RunDistance))
            if (!RunTimeLong) {

                Toast.info('请输入跑步时间', 1);

            }
            else if(Number(RunTimeLong) == 0){
                Toast.info('跑步时间不能为0', 1);
            }
            else if (!RunDistance) {
                Toast.info('请输入公里数', 1);

            }
            else if(Number(RunDistance) == 0){
                Toast.info('公里数不能为0', 1);
            } else {
                let formData = new FormData();
                let list = [];
                let count = 0;
                formData.append('RunDate',timeValue);
                formData.append('RunTimeLong',RunTimeLong);
                formData.append('Creator',userCode);
                formData.append('RunDistance',RunDistance);
                let a = (file) => {
                    console.log(file)
                    compressImage(file, (f) => {
                        list.push(f);
                        count++;
                        if (count < files.length) {
                            a(files[count].file);
                        } else {
                            Toast.hide()
                            list.forEach((element,index) => {
                                formData.append(`${index}`, element);
                            });
                            Toast.loading('上传中',0,null,true);
                            changeSport(formData);
                        }
                    })
                }
                if (files.length) {
                    Toast.loading('上传中', 10, () => {
                        console.log('Load complete !!!');
                    })
                    a(files[0].file);
                } else {
                    console.log(2)
                    changeSport(formData);
                }
            }
            
        });
    };
    componentDidUpdate() {
        const {sportUpload,cancelUploadState,history} = this.props;
        console.log("history",history)
        if(sportUpload){
            Toast.success('上传成功!', 1);
            this.onReset()
            cancelUploadState()
            history.goBack()
        }
    }
    // 重置
    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            files: [],
            RunTimeLong: '',
            RunDistance: ''
        })
    }
    onBlurTime = (val) => {
        if (val) {
            this.setState({
                RunTimeLong: Number(val).toFixed(2)
            })
        }
    }
    onBlurDistance = (val) => {
        if (val) {
            this.setState({
                RunDistance: Number(val).toFixed(2)
            })
        }
    }
    handleTimeChange = (value) => {
        console.log("value", value)
        console.log("type",typeof(value))
        if (value >= 1000) {
            value = 999
        } else {
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        }
        this.setState({
            RunTimeLong: value
        })
    }
    handleDistanceChange = (value) => {
        if (value >= 1000) {
            value = 999
        } else {
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        }
        this.setState({
            RunDistance: value
        })
    }
    render() {
        const {getFieldProps} = this.props.form;
        const {type, files, RunTimeLong, RunDistance} = this.state;
        return (
            <div style={{position:"relative"}}>
                <List className="date-picker-list">
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        value={this.state.date}
                        {...getFieldProps('dp', {
                            initialValue: this.state.date,
                        })}
                    >
                        <Item arrow="horizontal">跑步日期</Item>
                    </DatePicker>
                    <InputItem
                        //value={this.state.durationTime}
                        {...getFieldProps('RunTimeLong')}
                        type={type}
                        placeholder="请输入分钟"
                        value={RunTimeLong}
                        clear
                        onChange={this.handleTimeChange}
                        onBlur={this.onBlurTime}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >跑步时间</InputItem>
                    <InputItem
                        //value={this.state.kilometer}
                        {...getFieldProps('RunDistance')}
                        type={type}
                        placeholder="请输入公里数"
                        value={RunDistance}
                        clear
                        onChange={this.handleDistanceChange}
                        onBlur={this.onBlurDistance}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >距离(公里)</InputItem>
                    {/*<InputItem*/}
                        {/*type={type}*/}
                        {/*placeholder="请输入配速"*/}
                        {/*clear*/}
                        {/*onBlur={this.speedBtn}*/}
                        {/*moneyKeyboardWrapProps={moneyKeyboardWrapProps}*/}
                    {/*>跑步配速</InputItem>*/}
                </List>

                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 9}
                    multiple={true}
                    onAddImageClick={this.onAddImageClick}
                />
                <Item>
                    <Button size="small" inline style={{ width:"46%", marginRight: "20px" }} onClick={this.onReset}>重置</Button>
                    <Button type="primary" size="small" inline style={{ width:"46%" }} onClick={this.handleConfirm}>确认</Button>
                </Item>
            </div>
        );
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    sportUpload:state.getIn(['sport','sportUpload'])
})
const mapDispatch = (dispatch) => ({
    changeSport(sportData){
        dispatch(actionCreators.addSport(sportData))
    },
    cancelUploadState(){
        dispatch(actionCreators.cancelUploadState())
    }
})
const H5NumberInputExampleWrapper = connect(mapState,mapDispatch)(createForm()(CreateSport));
export default H5NumberInputExampleWrapper
