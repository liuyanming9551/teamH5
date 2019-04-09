import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Map} from "immutable";
import { List, WhiteSpace, InputItem,Button,WingBlank ,Toast} from 'antd-mobile';
import {withRouter} from "react-router-dom";
import "./index.less"
import {actionCreators} from "../store";
class AddComment extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: ''
        }
    }

    onInputChange = (val) => {
        this.setState({
            inputValue: val
        })
    }

    btnSubmit = () =>{
        //这里少一个参数
        const {userCode} = this.props;
        const {inputValue} = this.state;
        let data = {
            UserCode: userCode,
            inputValue: inputValue
        }
        // this.props.addComment(data)
    }
    // componentDidUpdate(){

    //     const {isChangeSuccess,cancelDetailState,history} = this.props;
    //     console.log(isChangeSuccess)
    //     if(isChangeSuccess){
    //         Toast.success('修改成功!',1);
    //         cancelDetailState();
    //         history.goBack();
    //     }
    // }
    render() {
        return (
            <div>
                <List>
                    <WhiteSpace size='lg' />
                    <WingBlank size='md'>
                        <InputItem
                            value={this.state.inputValue}
                            placeholder="请输入内容"
                            maxLength = '6'
                            onChange = {(val) => {this.onInputChange(val)}}
                        />
                    </WingBlank>
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
})
const mapDispatch = (dispatch) => ({
    addComment(data){
        dispatch(actionCreators.addComment(data))
    }
})
export default connect(mapState,mapDispatch)(withRouter(AddComment));  