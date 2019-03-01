import React,{PureComponent} from 'react';
import {actionCreators} from './store';
import "./index.less";
import {connect} from "react-redux";

class Login extends PureComponent{
    componentWillMount() {
        this.props.getToken("wxd7d90e914e3cb0a0","-60fowAIpg0iiCg7FDz3LnJpnqqOBs2-7MD7SdUAH2E")
    }

    render(){
        return(
            <div>
                this is Login page
            </div>
        )
    }
}
const mapState = (state) => ({

})
const mapDispatch = (dispatch) => ({
    getToken(cropid, corpsecret){
        dispatch(actionCreators.getToken(cropid, corpsecret))
    }
})
export default connect(mapState,mapDispatch)(Login);