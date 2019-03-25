import React,{Component} from 'react';
import Main from '../layouts/main';
import HisContent from '../pages/His/index'
export default class His extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <HisContent location = {propsData} />
            </Main>
        )
    }
}
