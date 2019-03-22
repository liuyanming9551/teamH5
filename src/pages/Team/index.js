import React from "react";
import TeamChart from './teamChart';
import PersonChart from './personChart';
import {WhiteSpace} from "antd-mobile";
class Team extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <WhiteSpace size='lg'/>
                    <p style={{textAlign:"center"}}>团队统计图</p>
                    <TeamChart/>
                </div>
                <div>
                    <p style={{textAlign:"center"}}>个人统计图</p>
                    <PersonChart/>
                </div>
            </div>
        );
    }
}
export default Team

