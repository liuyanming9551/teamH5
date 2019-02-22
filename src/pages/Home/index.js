import React, { Component } from 'react';
import { NoticeBar } from 'antd-mobile'
import "./index.less";
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return <div>
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </NoticeBar>
    <div>

    </div>
    <div className="paiMing">
        <p style={{background:'white',fontWeight:'500',fontSize:"20px",padding:'6px'}}>上周运动总里程排名</p>
        <ul style={{background:'white',display:'flex',justifyContent:'space-around'}}>
            <li style={{listStyle:'none'}}>
                <img src={require("./../../test/jin.png")} style={{width:'100px',height:'110px'}}/>
                <p className="getName">刘然</p>
                <h3 className="getLength">22.8KM</h3>
            </li>
            <li style={{listStyle:'none'}}>
                <img src={require("./../../test/yin.png")} style={{width:'100px',height:'110px'}}/>
                <p className="getName">康贝</p>
                <h3 className="getLength">22KM</h3>
            </li>
            <li style={{listStyle:'none'}}>
                <img src={require("./../../test/tong.png")} style={{width:'100px',height:'110px'}}/>
                <p className="getName">刘艳明</p>
                <h3 className="getLength">20KM</h3>
            </li>
        </ul>
    </div>
        </div>
    }
}
export default Home;