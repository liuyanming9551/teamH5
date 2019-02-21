import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile'
class Team extends  Component {
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
            >团队</NavBar>
        </div>
    }
}
export default Team;