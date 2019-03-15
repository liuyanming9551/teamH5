import React,{Component} from 'react';
import Main from '../layouts/main';
import HomeContent from '../pages/Home/loadable'
export default class Home extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <HomeContent />
            </Main>
        )
    }
}
