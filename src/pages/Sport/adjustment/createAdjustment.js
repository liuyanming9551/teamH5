import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, DatePicker, ImagePicker, List, InputItem, Button, WingBlank, WhiteSpace, Icon, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {compressImage} from './../../../util/util';
import {actionCreators} from './../store';

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
    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
        type: 'money',
        files: [],
        selectedArr: [],
        activityType: []
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

    // 确认
    handleConfirm = () => {
        let {files, selectedArr} =this.state;
        let emptyTip = false;
        if (selectedArr.length) {
            selectedArr.map((it, i) => {
                if (it[1] == undefined) {
                    Toast.info('请输入调整距离', 1);
                }
            })
        } else {
            emptyTip = true;
        }
        this.props.form.validateFields((err, values) => {
            console.log("values", values)
            if (!values.activityName) {
                Toast.info('请输入活动名称', 1);
            } else if (!values.activityType) {
                Toast.info('请选择活动类型', 1);
            } else if (emptyTip) {
                Toast.info('请选择姓名', 1);
            } else {
                let formData = new FormData();
                let list = [];
                let count = 0;
                formData.append('activityName',values.activityName);
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
                            Toast.loading('上传中',0,null,true);
                            // changeSport(formData);
                        }
                    })
                }
                if (files.length) {
                    Toast.loading('上传中', 10, () => {
                    })
                    a(files[0].file);
                } else {
                    // changeSport(formData);
                }
            }
            
        });
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            files: [],
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
        console.log("v", v)
        let { selectedArr } = this.state;
        for (var i = 0; i < selectedArr.length; i++) {
            console.log('selectedArr[i][0]', selectedArr[i][0])
            if (selectedArr[i][0] == v) {
                v = undefined;
                Toast.info('该名称已存在', 1);
            }
        }
        if (v) {
            selectedArr.push([v, undefined])
            selectedArr = [...selectedArr];
            this.setState({
                selectedArr
            });
        }
    }

    // 选择类型
    selectTypeOK = (v) => {
        console.log("selectTypeOK", v)
        this.setState({
            activityType: v
        })
    }

    // 删除
    deleteSelectName = (index) => {
        console.log("index", index)
        let { selectedArr } = this.state;
        selectedArr.splice(index, 1);
        selectedArr = [...selectedArr];
    
        this.setState({
            selectedArr
        });
    };

    render() {     
        const {allUsers} = this.props;
        let users = "";
        if(allUsers){
            users = allUsers.toJS();
        }
        console.log("users", users)
        const {getFieldProps} = this.props.form;
        const {type, files, selectedArr, activityType} = this.state;
        return (
            <div style={{position: "relative"}}>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
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
                        title="Select Date"
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
                        data={users} 
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
                                                value={item[0]}
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
                        onChange={(v) => {
                            console.log('onChange', v);
                        }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        {...getFieldProps('activityRemark', {
                            initialValue: '',
                        })}
                    >备注</InputItem>
                </List>
                <ImagePicker
                    files={files}
                    onChange={(files) => {this.onImageChange(files)}}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 9}
                    multiple={true}
                    onAddImageClick={() => {this.onAddImageClick()}}
                />
                <List.Item>
                    <Button size="small" inline style={{ width:"46%", marginRight: "20px" }} onClick={() => {this.onReset()}}>重置</Button>
                    <Button type="primary" size="small" inline style={{ width:"46%" }} onClick={() => {this.handleConfirm()}}>确认</Button>
                </List.Item>
            </div>
        );
    }
}

const mapState =  (state) => ({
    sportDetailData:state.getIn(['sport','sportDetailData']),
    allUsers: state.getIn(['sport', 'allUsers'])
})

const mapDispatch = (dispatch) => ({
    getUsers(){
        dispatch(actionCreators.getAllUsers())
    },
    getActivityType(){
        dispatch(actionCreators.getActivityType())
    }
})

const H5NumberInputExampleWrapper = connect(mapState,mapDispatch)(createForm()(CreateAdjustment));
export default H5NumberInputExampleWrapper;
