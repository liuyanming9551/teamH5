import React,{Component} from 'react';
import Main from '../layouts/main';
import PkContent from '../pages/Pk/index.js';
export default class Pk extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <PkContent location = {propsData} />
            </Main>
        )
    }
}
