import React from "react";
import "./index.less";
import {List,Badge} from 'antd-mobile' 
class Pk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return <div>
          <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px'}}>发起日期区间</p>
         <button className="btnStyle btnLeft">今天</button>
         <button className="btnStyle">本周内</button>
         <button className="btnStyle">本月内</button>
         <button className="btnStyle">本季度</button>

          <div>
          <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px'}}>发起人性别</p>
           <div style={{textAlign:'left'}}>
           <button className="btnStyle btnLeft">全部</button><button className="btnStyle">男</button><button className="btnStyle">女</button>
           </div>
          </div>
          <div>
           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px'}}>发起人所属部门</p>
           <button className="btnStyle btnLeft">产品中心</button>
           <button className="btnStyle">前端开发部</button>
           <button className="btnStyle">后端开发部</button>
           <div style={{textAlign:'left',marginLeft:'14px',marginTop:'10px'}}>
            <button className="btnStyle">测试部</button>
            <button className="btnStyle">质量保障部</button>
           </div>
           </div>
           <div>
           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px'}}>PK状态</p>
             <button className="btnStyle btnLeft">全部</button>
             <button className="btnStyle">通知中</button>
             <button className="btnStyle">进行中</button>
             <button className="btnStyle">已完成</button>
           </div>
            <div style={{ marginTop: '16px' ,marginLeft:'4%' }}>
                 <button style={{color:'white',borderRadius: "6px", background: '#33a3f4',border:'none',width:'47%',height:'30px'}}>重置</button>
                  <button style={{color:'white',borderRadius: "6px", background: '#33a3f4',border:'none',width:'47%',height:'30px',marginLeft:'1%'}}>确认</button>
               </div>
              <div>
              <List renderHeader={() => '查询结果'} className="my-list">
       <List.Item arrow="horizontal">
        <Badge text={0} style={{ marginLeft: '12px'}}><span style={{fontSize:"14px"}}>刘然</span><span style={{fontSize:"14px",marginLeft:'20px'}}>2019-2-18</span><span style={{fontSize:"14px",marginLeft:'20px'}}>2019-2-18</span></Badge>
        <div style={{float:"right",fontSize:"12px"}}> <span>康贝</span><br/><span style={{color:'red',display:'inlineBlock',marginTop:'12px'}}>进行中</span> </div>
       </List.Item>
         </List>
               </div>
         </div>
    }
}