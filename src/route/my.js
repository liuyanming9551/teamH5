import React,{Component} from 'react';
import Main from '../layouts/main';
import MyContent from '../pages/My/loadable'
export default class My extends Component{
    render(){
        return(
            <Main>
                <MyContent />
            </Main>
        )
    }
}
