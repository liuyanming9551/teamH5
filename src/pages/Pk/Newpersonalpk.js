// 新建个人PK
import React from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Button, DatePicker, List, Picker, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';
import {
    ActiveBox
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
        this.setState({
            nameValue:value
        })
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
                        value={this.state.startDate}
                        {...getFieldProps('startValue', {
                            initialValue: this.state.startDate,
                        })}
                    >
                        <Item arrow="horizontal">跑步日期</Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="Optional"
                        value={this.state.endDate}
                        {...getFieldProps('endValue', {
                            initialValue: this.state.endDate,
                        })}
                    >
                        <Item arrow="horizontal">跑步日期</Item>
                    </DatePicker>
                    <Picker
                        data={pkPeopleListData}
                        value={this.state.nameValue}
                        cols={1}
                        onChange={this.onChangeName}
                    >
                        <List.Item arrow="horizontal">被挑战人</List.Item>
                    </Picker>
                    <TextareaItem
                        {...getFieldProps('note1')}
                        rows={3}
                        placeholder="请输入你的赌注"
                    />
                </List>
                <ActiveBox>
                    <WhiteSpace size='lg'/>
                    <WingBlank size='lg' style={{overflow: "hidden"}}>
                        <Button type="ghost" size="small" inline style={{float: "left", width: "48%"}}>重置</Button>
                        <Button type="primary" size="small" inline style={{float: "right", width: "48%"}}>确认</Button>
                    </WingBlank>
                </ActiveBox>
            </div>

        )

    }
}
const mapState = (state) =>({
    userCode:state.getIn(['login','userCode']),
    pkPeopleList:state.getIn(['pk','pkPeopleList'])
})
const mapDispatch = (dispatch) =>({
    changeAllUser(userCode){
        dispatch(actionCreators.getAllUser(userCode))
    }
})
export default connect(mapState,mapDispatch)(createForm()(Newpersonalpk));