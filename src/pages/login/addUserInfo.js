import React,{PureComponent} from 'react';
import { Picker, List, WhiteSpace, TextareaItem,Button,WingBlank ,Toast} from 'antd-mobile';
import {actionCreators} from './store';
import "./index.less";
import {connect} from "react-redux";

class AddUserInfo extends PureComponent{
    constructor(props){
        super(props)
        this.onChangeGroup = this.onChangeGroup.bind(this)
        this.getPresentation = this.getPresentation.bind(this)
        this.getSpeciality = this.getSpeciality.bind(this)
        this.btnSubmit = this.btnSubmit.bind(this)
    }
    state = {
        groupValue: [],
        specialityValue:"",
        presentationValue:""
    };
    onChangeGroup = (group) => {
        console.log(group)
        this.setState({
            groupValue: group
        });
    };

    componentDidMount() {
        this.props.changeGroupInfo()
    }
    getSpeciality(specialityValue){//特长
        this.setState({
            specialityValue
        })
    }
    getPresentation(presentationValue){//自我介绍
        this.setState({
            presentationValue
        })
    }
    btnSubmit(){
        const [GroupId] = [...this.state.groupValue];
        const {specialityValue,presentationValue} = this.state;
        const {userModel} = this.props;
        const userModelInfo = userModel.toJS();
        if(!GroupId){
            Toast.info('请选择你所在的组!', 1);
            return
        }
        const param = {
            WXUserId:userModelInfo.userid,
            UserPhone:userModelInfo.mobile,
            UserSign:presentationValue,
            UserSkill:specialityValue,
            UserName:userModelInfo.name,
            GroupId
        }

        this.props.changeUserInfo(param);
        Toast.loading('登陆中',0,null,true);
    }
    componentDidUpdate() {
        const {loginSuccess,history} = this.props;
        if (loginSuccess) {
            Toast.success('登录成功！', 1);
            setTimeout(function () {
                history.replace('/')
            },1000)

        }
    }
    render(){
        const {groupInfo} = this.props;
        const groupInfoData = groupInfo.toJS();
        return(

            <div>
                <Picker
                    data={groupInfoData}
                    value={this.state.groupValue}
                    cols={1}
                    onChange={this.onChangeGroup}
                >
                    <List.Item arrow="horizontal">请选择你所在的组</List.Item>
                </Picker>
                <List renderHeader={() => '自我介绍'}>
                    <TextareaItem
                        rows={2}
                        onChange={this.getPresentation}
                        placeholder="请输入内容"
                    />
                </List>
                <List renderHeader={() => '特长'}>
                    <TextareaItem
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
    groupInfo:state.getIn(['login','groupInfo']),
    userModel:state.getIn(['login','userModel']),
    loginSuccess:state.getIn(['login','loginSuccess'])
})
const mapDispatch = (dispatch) => ({
    changeGroupInfo(){
        dispatch(actionCreators.getGroup())
    },
    changeUserInfo(param){
        dispatch(actionCreators.addUser(param))
    }
})
export default connect(mapState,mapDispatch)(AddUserInfo);