import React , { Component } from 'react';
import Footer from './footer';
export default class Main extends Component{
    render(){
        console.log(this.props)
        const location  = this.props.location;
        const children = this.props.children
        return(
            <div>
                <Footer location={location} children={children}  />
            </div>

        )
    }
}
