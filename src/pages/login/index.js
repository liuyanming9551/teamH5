import React,{PureComponent} from 'react';
import {actionCreators} from './store';
import "./index.less";
import {connect} from "react-redux";
import * as util from '../../util/util';
class Login extends PureComponent{
    componentDidMount() {
        const {search} = this.props.location;
        let code = search?util.parseQuery(search).code:'';
        console.log(code)
        this.props.getUserInfo(code)
    }
    isLogin(stateCode,history){
       switch (stateCode) {
           case 1001:
               return history.push('/')
           case 1004:
               return history.push('/addUserInfo')
           default:
               console.log("异常！！！！")
       }
    }
    render(){
        const {stateCode,history} = this.props;
        return(
            <div>
                <div style={{textAlign:"center",lineHeight:'80vh'}}>
                    {this.isLogin(stateCode,history)}
                    登录中。。。
                </div>
            </div>
        )
    }
}
const mapState = (state) => ({
    stateCode:state.getIn(['login','stateCode'])
})
const mapDispatch = (dispatch) => ({
    getUserInfo(code){
        dispatch(actionCreators.getUser(code))
    }

})
export default connect(mapState,mapDispatch)(Login);