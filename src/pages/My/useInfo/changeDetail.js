import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Map} from "immutable";
import {List, WhiteSpace, TextareaItem, Button, WingBlank, Toast, Picker} from 'antd-mobile';
import {withRouter} from "react-router-dom";
import "./index.less"
import {actionCreators} from "../store";
class ChangeDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            introduceValue:'',
            skillValue:'',
            groupValue: [],
        }
    }
    componentDidMount(){
        const {userInformation,getGroup} = this.props;
        let userInformationData = Map(userInformation);
        getGroup()
        if(userInformationData){
            this.setState({
                introduceValue:userInformationData.get('UserSign'),
                skillValue:userInformationData.get('UserSkill'),
                groupValue:[userInformationData.get('GroupId')]
            })
        }

    }
    getPresentation = (value)=>{
        this.setState({
            introduceValue:value
        })
    }
    getSpeciality = (value) =>{
        this.setState({
            skillValue:value
        })
    }
    btnSubmit = () =>{
        const {changeUserDetail,userCode} = this.props;
        const {introduceValue,skillValue, groupValue} = this.state;
        let detailValue = {
            UserSkill:skillValue,
            UserSign:introduceValue,
            UserCode:userCode,
            GroupId: groupValue
        }
        changeUserDetail(detailValue)
    }
    onChangeGroup = (group) => {
        this.setState({
            groupValue: group
        });
    };
    componentDidUpdate(){

        const {isChangeSuccess,cancelDetailState,history} = this.props;
        console.log(isChangeSuccess)
        if(isChangeSuccess){
            Toast.success('修改成功!',1);
            cancelDetailState();
            history.goBack();
        }
    }
    render() {
        const {groupInfo} = this.props;
        let groupInfoData = '';
        if(groupInfo){
            groupInfoData = groupInfo.toJS();
        }
        return (
            <div>
                <List renderHeader={() => '自我介绍'}>
                    <TextareaItem
                        value={this.state.introduceValue}
                        rows={2}
                        onChange={this.getPresentation}
                        placeholder="请输入内容"
                    />
                </List>
                <List renderHeader={() => '特长'}>
                    <TextareaItem
                        value={this.state.skillValue}
                        rows={2}
                        onChange={this.getSpeciality}
                        placeholder="特长请用英文逗号分割,例如：打篮球,游泳"
                    />
                </List>
                <List renderHeader={() => '所在组'}>
                    <Picker
                        data={groupInfoData}
                        value={this.state.groupValue}
                        cols={1}
                        onChange={this.onChangeGroup}
                    >
                        <List.Item arrow="horizontal">请选择你所在的组</List.Item>
                    </Picker>
                </List>

                <WhiteSpace size='lg' />
                <WingBlank size='md'>
                    <Button type="primary" onClick={this.btnSubmit}>提交</Button>
                </WingBlank>
            </div>
        )
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    userInformation:state.getIn(['my','userInformation']),
    isChangeSuccess:state.getIn(['my','isChangeSuccess']),
    groupInfo:state.getIn(['my','groupInfo']),
})
const mapDispatch = (dispatch) => ({
    changeUserDetail(detailValue){
        dispatch(actionCreators.changeUserDetailInfo(detailValue))
    },
    cancelDetailState(){
        dispatch(actionCreators.cancelDetailState())
    },
    getGroup(){
        dispatch(actionCreators.getGroup())
    }
})
export default connect(mapState,mapDispatch)(withRouter(ChangeDetail));