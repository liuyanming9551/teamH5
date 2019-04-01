import React,{PureComponent} from 'react';
import {actionCreators} from './store';
import "./index.less";
import {connect} from "react-redux";
import * as util from '../../util/util';
import { Icon } from 'antd-mobile';
import Loading from '../../component/loading';
class Login extends PureComponent{
    componentDidMount() {
        const {search} = this.props.location;
        let code = search?util.parseQuery(search).code:'';
        if(code){
            this.props.getUserInfo(code)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {stateCode,history} = this.props;
        console.log(history)
        if(stateCode){
            this.isLogin(stateCode,history)
        }
    }

    isLogin(stateCode,history){
       switch (stateCode) {
           case 1001:
               return history.replace('/')
           case 1004:
               return history.replace('/addUserInfo')
           default:
               console.log("异常！！！！")
       }
    }
    render(){
        return(
            <div>
                <div style={{textAlign:"center", lineHeight:'80vh'}}>
                    <Icon type="loading" />
                    {/* <Loading /> */}
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