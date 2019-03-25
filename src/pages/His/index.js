import React, { Component } from 'react';
import UserInfo from "./useInfo";
import "./index.less"
class His extends Component {
    
    render() {
        const {location} = this.props;
        return (
            <div className="myPlane">
                <header>
                    <UserInfo location={location} />
                </header>
                <section>

                </section>
                {/* <footer>

                </footer> */}
            </div>
        )
    }
}
export default His;