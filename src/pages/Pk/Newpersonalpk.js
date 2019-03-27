// 新建个人PK
import React from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Button, DatePicker, List, Picker, TextareaItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';
import {
    ActiveBtnBox
} from './style';


const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);



class Newpersonalpk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: now,
            endDate:now,
            nameValue:[]


        }
    }
    componentDidMount() {
        const {userCode,changeAllUser} =this.props;
        changeAllUser(userCode)
    }

    onChangeName = (value) =>{
        console.log(value)
        this.setState({
            nameValue:value
        })
    }
    onReset = () =>{
        this.props.form.resetFields();
    }
    handleConfirm = () =>{
        const {userCode,createPkInfo} = this.props;
        this.props.form.validateFields((err,values) => {
            console.log(values)
            const start = values.startValue.toISOString().slice(0, 10);
            const end = values.endValue.toISOString().slice(0, 10);
            const [people] = [...values.pkName];
            const wager = values.note;
            if(start>end){
                Toast.info('开始时间不能大于结束时间', 1);
                return false;
            }
            if(!people){
                Toast.info('请选择被挑战人', 1);
                return false;
            }
            let formData = new FormData();
            formData.append('StartDate',start);
            formData.append('EndDate',end);
            formData.append('PKA',userCode);
            formData.append('PKB',people);
            formData.append('PKProfit',wager);
            let parmas = {
                StartDate:start,
                EndDate:end,
                PKA:userCode,
                PKB:people,
                PKProfit:wager
            }
            createPkInfo(parmas)
        })

    }
    componentDidUpdate() {
        const {createPkSuccess,cancelCreatePkState,history} = this.props;
        if(createPkSuccess){
            Toast.success('创建成功',1);
            cancelCreatePkState();
            setTimeout(() =>{
                history.goBack();
            },1000)

        }
    }

    render() {

        const { getFieldProps } = this.props.form;
        const {pkPeopleList} = this.props;
        let pkPeopleListData = '';
        if(pkPeopleList){
            pkPeopleListData = pkPeopleList.toJS();
        }
        return (
            <div>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        minDate={this.state.startDate}
                        {...getFieldProps('startValue', {
                            initialValue: this.state.startDate,
                        })}
                    >
                        <Item arrow="horizontal">开始日期</Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        minDate={this.state.startDate}
                        {...getFieldProps('endValue', {
                            initialValue: this.state.endDate,
                        })}
                    >
                        <Item arrow="horizontal">结束日期</Item>
                    </DatePicker>
                    <Picker
                        data={pkPeopleListData}
                        cols={1}
                        onChange={this.onChangeName}
                        {...getFieldProps('pkName', {
                            initialValue: '',
                        })}
                    >
                        <List.Item arrow="horizontal">被挑战人</List.Item>
                    </Picker>
                    <TextareaItem
                        {...getFieldProps('note',{
                            initialValue:''
                        })}
                        rows={3}
                        placeholder="请输入你的赌注"
                    />
                </List>
                <ActiveBtnBox>
                    <WhiteSpace size='lg'/>
                    <WingBlank size='lg' style={{overflow: "hidden"}}>
                        <Button type="ghost" size="small" inline style={{float: "left", width: "48%"}} onClick={this.onReset}>重置</Button>
                        <Button type="primary" size="small" inline style={{float: "right", width: "48%"}} onClick={this.handleConfirm}>确认</Button>
                    </WingBlank>
                </ActiveBtnBox>
            </div>

        )

    }
}
const mapState = (state) =>({
    userCode:state.getIn(['login','userCode']),
    pkPeopleList:state.getIn(['pk','pkPeopleList']),
    createPkSuccess:state.getIn(['pk','createPkSuccess'])
})
const mapDispatch = (dispatch) =>({
    changeAllUser(userCode){
        dispatch(actionCreators.getAllUser(userCode))
    },
    createPkInfo(pkInfo){
        dispatch(actionCreators.createPk(pkInfo))
    },
    cancelCreatePkState(){
        dispatch(actionCreators.cancelCreatePkSuccess())
    }
})
export default connect(mapState,mapDispatch)(createForm()(Newpersonalpk));