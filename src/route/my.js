import React,{Component} from 'react';
import Main from '../layouts/main';
import MyContent from '../pages/My/index'
export default class My extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <MyContent location = {propsData} />
            </Main>
        )
    }
}
