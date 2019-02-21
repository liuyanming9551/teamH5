import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import UserInfo from "./../../component/useInfo";
class My extends Component {
    render() {
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