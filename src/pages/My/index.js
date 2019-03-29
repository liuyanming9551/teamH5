import React, { Component } from 'react';
import UserInfo from "./useInfo";
import {withRouter} from "react-router-dom";
import "./index.less"
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
export default withRouter(My);