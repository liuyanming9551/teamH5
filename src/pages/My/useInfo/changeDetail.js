import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Map} from "immutable";
import { List, WhiteSpace, TextareaItem,Button,WingBlank ,Toast} from 'antd-mobile';
import "./index.less"
import {actionCreators} from "../store";
class ChangeDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            introduceValue:'',
            skillValue:''
        }
    }
    componentDidMount(){
        const {userInformation} = this.props;
        let userInformationData = Map(userInformation);
        console.log(userInformationData)
        if(userInformationData){
            this.setState({
                introduceValue:userInformationData.get('UserSign'),
                skillValue:userInformationData.get('UserSkill')
            })
        }

    }

    // const {userInformation,userModel} = this.props;
    // let map = Map(userModel);
    // let userInformationData = '';
    // let userSkills = [];
    // if(userInformation){
    //     userInformationData = userInformation.toJS();
    //     console.log(userInformationData)
    //     userSkills = userInformationData.UserSkill.split(',');
    // }
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
        //这里少一个参数
        const {changeUserDetail,userCode} = this.props;
        const {introduceValue,skillValue} = this.state;
        let detailValue = {
            UserSkill:skillValue,
            UserSign:introduceValue,
            UserCode:userCode
        }
        changeUserDetail(detailValue)
    }
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
    isChangeSuccess:state.getIn(['my','isChangeSuccess'])
})
const mapDispatch = (dispatch) => ({
    changeUserDetail(detailValue){
        dispatch(actionCreators.changeUserDetailInfo(detailValue))
    },
    cancelDetailState(){
        dispatch(actionCreators.cancelDetailState())
    }
})
export default connect(mapState,mapDispatch)(ChangeDetail);