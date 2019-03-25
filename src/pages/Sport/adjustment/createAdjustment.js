import React, {Component} from 'react';
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
    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
        type: 'money',
        files: [],
        selectedArr: [[undefined, undefined]],
        nameArr: [
            {
                label: 'Grace',
                value: 'Grace',
            },{
                label: 'Lily',
                value: 'Lily',
            },{
                label: 'Nancy',
                value: 'Nancy',
            },{
                label: 'Frank',
                value: 'Frank',
            },{
                label: 'Mia',
                value: 'Mia',
            }
        ]
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

    handleConfirm = () => {
        let {files} =this.state;
        this.props.form.validateFields((err, values) => {
            console.log("values", values)
            if (!values.activityName) {
                Toast.info('请输入活动名称', 1);
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

    // 选中
    selectNameOK = (v) => {
        let { selectedArr } = this.state;
        selectedArr.push([v, undefined])
        selectedArr = [...selectedArr];
        this.setState({
            selectedArr
        });
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
        const {getFieldProps} = this.props.form;
        const {type, files, nameArr, selectedArr} = this.state;
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
                        data={nameArr} 
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
                                        <div className="deleteBtn"><Icon type="cross-circle" /></div>
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

const H5NumberInputExampleWrapper = createForm()(CreateAdjustment);
export default H5NumberInputExampleWrapper
