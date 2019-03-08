import React,{Component} from 'react';
import SportList from './sportLists';
import Main from './../../../layouts/main';

export default class MySport extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <SportList location = {propsData} />
            </Main>
        )
    }
}