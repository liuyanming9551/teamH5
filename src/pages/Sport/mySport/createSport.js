import React, {Component} from 'react';
import {DatePicker, List, InputItem, ImagePicker, Button, WingBlank, Toast} from 'antd-mobile';
import {connect} from "react-redux";
import {createForm} from 'rc-form';
import {actionCreators} from './../store';
import {compressImage} from './../../../util/util';
import {Map} from "immutable";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));

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
        this.durationTimeBtn= this.durationTimeBtn.bind(this);
        this.kilometerBtn = this.kilometerBtn.bind(this);
        // this.speedBtn = this.speedBtn.bind(this);
    }

    state = {
        date:now,
        type: 'money',
        files: [],
        durationTime:'',
        kilometer:''
        // speed:''
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        //e.preventDefault();
    };
    onTabChange = (key) => {
        console.log(key);
    };
    handleConfirm(){
        const {userCode,changeSport} = this.props;
        const {durationTime,kilometer,speed,files} =this.state;
        const fieldsValue = this.props.form.getFieldsValue();
        const timeValue = fieldsValue.dp.toISOString().slice(0, 10)
        this.props.form.validateFields((err, values) => {
            let files = this.state.files;
            let formData = new FormData();
            let list = [];
            let count = 0;
            formData.append('RunDate',timeValue);
            formData.append('RunTimeLong',durationTime);
            formData.append('Creator',userCode);
            formData.append('RunDistance',kilometer);
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
                        changeSport(formData);
                    }
                })
            }
            if (files.length) {
                Toast.loading('正在加载', 10, () => {
                    console.log('Load complete !!!');
                })
                a(files[0].file);
            } else {
                changeSport(formData);

            }
        });


    };
    durationTimeBtn(durationTime){
        this.setState({
            durationTime
        })
    }
    kilometerBtn(kilometer){
        this.setState({
            kilometer
        })
    }
    // speedBtn(speed){
    //     this.setState({
    //         speed
    //     })
    // }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {sportUpload,cancelUploadState} = this.props;
        if(sportUpload){
            Toast.success('上传成功!', 1);
            cancelUploadState()
        }

    }

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

                        {...getFieldProps('dp', {
                            initialValue: this.state.date,
                        })}
                    >
                        <List.Item arrow="horizontal">跑步日期</List.Item>
                    </DatePicker>
                    <InputItem
                        type={type}
                        placeholder="请输入时长"
                        clear
                        onBlur={this.durationTimeBtn}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >时长(分钟)</InputItem>
                    <InputItem
                        type={type}
                        placeholder="请输入公里数"
                        clear
                        onBlur={this.kilometerBtn}
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
                <div className="activeBox">
                    <WingBlank size='lg' style={{overflow:"hidden"}}>
                        <Button type="ghost" size="small" inline  style={{ float:"left",width:"45%" }} >重置</Button>
                        <Button
                            type="primary"
                            size="small"
                            inline
                            style={{ float:"right",width:"45%" }}
                            onClick={this.handleConfirm}
                        >确认</Button>
                    </WingBlank>
                </div>
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
