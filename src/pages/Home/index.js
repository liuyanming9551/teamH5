import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile'
class Home extends  Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    render() {
        return <div>
             <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
            >首页</NavBar>
        </div>
    }
}
export default Home;