import React,{Component} from 'react';
import CheckList from './checkList';
import Main from './../../../layouts/main';
export default class MySport extends Component{
    render(){
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <CheckList />
            </Main>
        )
    }
}