import React,{Component} from 'react';
import Main from '../layouts/main';
import PkContent from '../pages/Pk';
export default class Pk extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <PkContent/>
            </Main>
        )
    }
}
