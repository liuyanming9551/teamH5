import React,{Component} from 'react';
import Main from '../layouts/main';
import PkContent from '../pages/Pk/loadable';
export default class Pk extends Component{
    render(){
        return(
            <Main>
                <PkContent />
            </Main>
        )
    }
}
