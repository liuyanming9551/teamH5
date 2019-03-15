import React,{Component} from 'react';
import Main from '../layouts/main';
import SportContent from '../pages/Sport/loadable';
export default class Sport extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <SportContent location = {propsData}/>
            </Main>
        )
    }
}
