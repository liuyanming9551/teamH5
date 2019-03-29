import React,{Component} from 'react';
import Main from '../layouts/main';
import SportContent from '../pages/Sport/loadable';
export default class Sport extends Component{
    render(){
        return(
            <Main>
                <SportContent/>
            </Main>
        )
    }
}
