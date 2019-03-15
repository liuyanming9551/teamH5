import React,{Component} from 'react';
import Main from '../layouts/main';
import TeamContent from '../pages/Team/loadable';
export default class Team extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <TeamContent/>
            </Main>
        )
    }
}
