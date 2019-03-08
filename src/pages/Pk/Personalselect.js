import React from "react";
import "./index.less";
import { List, Badge } from 'antd-mobile'

class Personalselet extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isToggleOn: true,
            dispaly: 'none',
            defaultWidth: false
        }
    }
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            display: prevState.isToggleOn ? 'none' : 'block',
            defaultWidth: !this.state.defaultWidth
        }));
    }

    render() {
        let styleObj = {
            borderRadius: "6px", border: 'none', height: '30px',
            width: this.state.defaultWidth ? '47%' : '98%',
            background: this.state.defaultWidth ? '#33a3f4' : '#e1e1e1',
            color: this.state.defaultWidth?'#ffffff':'#000000'
        }
        return <div>
            <div style={{position:'absolute',background:'white',width:'100%',zIndex:'100'}}>
            <div className="btns" style={{ display:this.state.isToggleOn?'none':'block'}}>
                <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起日期区间</p>
                <button className="btnStyle btnLeft">今天</button>
                <button className="btnStyle">本周内</button>
                <button className="btnStyle">本月内</button>
                <button className="btnStyle">本季度</button>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起人性别</p>
                    <div style={{ textAlign: 'left' }}>
                        <button className="btnStyle btnLeft">全部</button><button className="btnStyle">男</button><button className="btnStyle">女</button>
                    </div>
                </div>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起人所属部门</p>
                    <button className="btnStyle btnLeft">产品中心</button>
                    <button className="btnStyle">前端开发部</button>
                    <button className="btnStyle">后端开发部</button>
                    <div style={{ textAlign: 'left', marginLeft: '24px', marginTop: '10px' }}>
                        <button className="btnStyle">测试部</button>
                        <button className="btnStyle">质量保障部</button>
                    </div>
                </div>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>PK状态</p>
                    <button className="btnStyle btnLeft">全部</button>
                    <button className="btnStyle">通知中</button>
                    <button className="btnStyle">进行中</button>
                    <button className="btnStyle">已完成</button>
                </div>
            </div>
            <div style={{ marginTop: '16px', marginLeft: '4%', display: 'flex' }}>
                <button style={{ color: 'white', borderRadius: "6px", background: '#33a3f4', border: 'none', width: '47%', height: '30px', display: this.state.isToggleOn?'none':'block'  }}>重置</button>
                <button style={styleObj} onClick={this.handleClick}>  {this.state.isToggleOn ? '条件筛选' : '确定'}</button>
            </div>
            </div>
            <div>
                <List renderHeader={() => '查询结果'} className="my-list">
                    <List.Item arrow="horizontal">
                        <Badge text={0} style={{ marginLeft: '12px' }}><span style={{ fontSize: "14px" }}>刘然</span><span style={{ fontSize: "14px", marginLeft: '20px' }}>2019-2-18</span><span style={{ fontSize: "14px", marginLeft: '20px' }}>2019-2-18</span></Badge>
                        <div style={{ float: "right", fontSize: "12px" }}> <span>康贝</span><br /><span style={{ color: 'red', display: 'inlineBlock', marginTop: '12px' }}>进行中</span> </div>
                    </List.Item>
                </List>
            </div> 
        </div>
    }
}
export default Personalselet;