import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {Picker, DatePicker, ImagePicker, List, InputItem, Button, WingBlank, WhiteSpace, Icon, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {compressImage} from './../../../util/util';

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

class CreateAdjustment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: now,
            time: now,
            utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            visible: false,
            type: 'money',
            files: [],
            selectedArr: [],
            activityType: [],
        }
    }

    componentDidMount () {
        this.props.getUsers();
        this.props.getActivityType();
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick = (e) => {
        
    };

    onTabChange = (key) => {
        console.log(key);
    };

    // 确认
    handleConfirm = () => {
        const {userCode, addActivity} = this.props;
        let {files, selectedArr, activityType} =this.state;
        let emptyName = false;
        let emptyDistance = false;
        let personCount = 0;
        if (selectedArr.length) {
            personCount = selectedArr.length;
            selectedArr.map((it, i) => {
                if (it[1] == undefined) {
                    emptyDistance = true;
                }
            })
        } else {
            emptyName = true;
            personCount = 0;
        }
        this.props.form.validateFields((err, values) => {
            // console.log("values", values)
            const fieldsValue = this.props.form.getFieldsValue();
            const activityDate = fieldsValue.activityDate.toISOString().slice(0, 10)
            if (!values.activityName) {
                Toast.info('请输入活动名称', 1);
            } else if (!values.activityType) {
                Toast.info('请选择活动类型', 1);
            } else if (emptyName) {
                Toast.info('请选择姓名', 1);
            } else if (emptyDistance) {
                Toast.info('请输入调整距离', 1);
            } else if (!values.activityContent) {
                Toast.info('请输入活动内容', 1);
            } else {
                let formData = new FormData();
                let list = [];
                let count = 0;
                formData.append('Creator',userCode);
                formData.append('ActivityName',values.activityName);
                formData.append('ActivityDate',activityDate);
                formData.append('ActivityRemark',values.activityContent);
                formData.append('ParameterCode',values.activityType);
                formData.append('PersonCount',personCount);
                for (let i = 0; i < selectedArr.length; i++) {
                    formData.append('UserCode'+(i+1), selectedArr[i][0].value);
                    formData.append('AdjustedDistance'+(i+1), selectedArr[i][1]);
                }
                let a = (file) => {
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
                            Toast.loading('上传中',1,null,true);
                            addActivity(formData);
                        }
                    })
                }
                if (activityType[0] == "998dc186-d237-431e-a6d5-4f7249d65356") {
                    if (files.length) {
                        Toast.loading('上传中', 1, () => {
                            console.log('Load complete !!!');
                        })
                        a(files[0].file);
                    } else {
                        Toast.info('请选择图片', 1);
                    }
                } else {
                    addActivity(formData);
                }
            }
            
        });
    };

    componentDidUpdate() {
        const {activityUpload,cancelUploadActivity,history} = this.props;
        if(activityUpload){
            Toast.success('上传成功!', 1);
            this.onReset()
            cancelUploadActivity()
            setTimeout(() =>{
                history.goBack();
            },1000)
        }
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            files: [],
            selectedArr: []
        })
    }

    onAddImageClick = (e) => {
        //e.preventDefault();
    };

    // 图片发生改变
    onImageChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    // 调整距离改变
    distanceChange = (v, index) => {
        let { selectedArr } = this.state;
        selectedArr[index][1] = v;
        selectedArr = [...selectedArr];
        this.setState({
            selectedArr
        });
    }

    // 添加姓名
    selectNameOK = (v) => {
        const {allUsers} = this.props;
        let users = "";
        let currentData = ''
        if(allUsers) {
            users = allUsers.toJS();
            users.map((item,index) => {
                if(v[0] === item.value){
                    currentData = item
                }
                
            })
        }
        let { selectedArr } = this.state;
        for (var i = 0; i < selectedArr.length; i++) {
            if (selectedArr[i][0].value == v) {
                v = undefined;
                Toast.info('该名称已存在', 1);
            }
        }
        if (v) {
            selectedArr.push([currentData, undefined])
            selectedArr = [...selectedArr];
            this.setState({
                selectedArr
            });
        }
    }

    // 选择类型
    selectTypeOK = (v) => {
        this.setState({
            activityType: v
        })
    }

    // 删除
    deleteSelectName = (index) => {
        let { selectedArr } = this.state;
        selectedArr.splice(index, 1);
        selectedArr = [...selectedArr];
    
        this.setState({
            selectedArr
        });
    };

    render() {     
        const {allUsers, allTypes} = this.props;
        let users = "";
        let types = "";
        if(allUsers) {
            users = allUsers.toJS();
            
        }
        if (allTypes) {
            types = allTypes.toJS();
        }
        const {getFieldProps} = this.props.form;
        const {type, files, selectedArr, activityType} = this.state;
        return (
            <div className="create-activity">
                <List className="date-picker-list">
                    <InputItem
                        placeholder="请输入活动名称"
                        clear
                        onChange={(v) => {}}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        {...getFieldProps('activityName', {
                            initialValue: '',
                        })}
                    >活动名称</InputItem>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        value={this.state.date}
                        onChange={date => this.setState({date})}
                        {...getFieldProps('activityDate', {
                            initialValue: this.state.date,
                        })}
                    >
                        <List.Item>活动日期</List.Item>
                    </DatePicker>
                    <Picker 
                        data={types} 
                        cols={1} 
                        value={activityType}
                        {...getFieldProps('activityType')} 
                        className="forss"
                        onOk={(v) => {this.selectTypeOK(v)}}
                    >
                        <List.Item arrow="horizontal">活动类型</List.Item>
                    </Picker>
                    <Picker 
                        data={users} 
                        cols={1} 
                        {...getFieldProps('name')} 
                        className="forss"
                        onOk={(v) => {this.selectNameOK(v)}}
                    >
                        <List.Item arrow="horizontal">请选择姓名</List.Item>
                    </Picker>
                    {
                        selectedArr.map((item, index) => {
                            if (item[0]) {
                                return (
                                    <div key={index} className="nameSelect">
                                        <div className="deleteBtn" onClick={() => {this.deleteSelectName(index)}}><Icon type="cross-circle" /></div>
                                        <div className="selectedName">
                                            <InputItem
                                                value={item[0].label}
                                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                                moneyKeyboardAlign="left"
                                            >姓名</InputItem>
                                        </div>
                                        <div className="adjustDistance">
                                            <InputItem
                                                type={type}
                                                value={item[1]}
                                                onChange={(v) => {this.distanceChange(v, index)}}
                                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                                moneyKeyboardAlign="left"
                                            >调整距离</InputItem>
                                        </div>
                                    </div>
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                    
                    <InputItem
                        clear
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        {...getFieldProps('activityContent', {
                            initialValue: '',
                        })}
                    >活动内容</InputItem>
                </List>
                {
                    activityType[0] == "998dc186-d237-431e-a6d5-4f7249d65356" ? (
                        <ImagePicker
                            files={files}
                            onChange={(files) => {this.onImageChange(files)}}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 9}
                            multiple={true}
                            onAddImageClick={() => {this.onAddImageClick()}}
                        />
                    ) : null
                }
                <List.Item className="btn-group">
                    <Button size="small" inline className="btn-reset" onClick={() => {this.onReset()}}>重置</Button>
                    <Button type="primary" size="small" inline className="btn-confirm" onClick={() => {this.handleConfirm()}}>确认</Button>
                </List.Item>
            </div>
        );
    }
}

const mapState =  (state) => ({
    userCode:state.getIn(['login','userCode']),
    activityUpload:state.getIn(['sport','activityUpload']),
    sportDetailData:state.getIn(['sport','sportDetailData']),
    allUsers: state.getIn(['sport', 'allUsers']),
    allTypes: state.getIn(['sport', 'allTypes']),
})

const mapDispatch = (dispatch) => ({
    getUsers() {
        dispatch(actionCreators.getAllUsers())
    },
    getActivityType() {
        dispatch(actionCreators.getActivityType())
    },
    addActivity(activityData) {
        dispatch(actionCreators.addActivity(activityData))
    },
    cancelUploadActivity(){
        dispatch(actionCreators.cancelUploadActivity())
    }
})

const H5NumberInputExampleWrapper = connect(mapState,mapDispatch)(createForm()(CreateAdjustment));
export default H5NumberInputExampleWrapper;
