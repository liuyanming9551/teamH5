import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import UserInfo from "./useInfo";
import "./index.less"
class My extends Component {
    
    render() {
        console.log("this is props ",this.props)
        return (
            <div className="myPlane">
                <header>
                    <UserInfo />
                </header>
                <section>

                </section>
                <footer>

                </footer>
            </div>
        )
    }
}
export default My;