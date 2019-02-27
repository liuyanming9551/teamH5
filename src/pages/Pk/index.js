import React, {Component,Fragment
} from 'react'
// import Newpersonalk from "./Newpersonalpk"
// import PersonalLook from "./PersonalLook"
// import Personaselect from "./Personalselect"
import { Modal, List, Badge } from 'antd-mobile';
const operation = Modal.operation;
class Pk extends React.Component {
    render() {
        console.log("this.props",this.props)
      
        return <div style={{position:'relative'}}>
            <div style={{position:"absolute", left: '345px', top: '400px'}}>
                <img onClick={this.showShareActionSheet} src={require("./../../test/jzjc.png")} onClick={() => operation([
                    { text: '新建', onPress: () => {
                        this.props.location.history.push('/pk/newpersonalpk')
                    } },
                    { text: '筛选', onPress: () =>{
                        this.props.location.history.push('/pk/personalselect')
                    } },
                ])}
                ></img>
            </div>
            <List renderHeader={() => '情况如下'} className="my-list" style={{ textAlign: 'center' }}>
                <List.Item arrow="horizontal">
                    <Badge text={0} style={{ marginLeft: "12px" }}><span style={{ fontSize: "16px" }}>刘然</span><span style={{ fontSize: "16px", marginLeft: '20px' }}>2019-2-18</span><span style={{ fontSize: "16px", marginLeft: '16px' }}>2019-2-18</span></Badge>
                    <div style={{ float: "right", fontSize: "12px" }}> <span>康贝</span><br /><span style={{ color: 'red', display: 'inlineBlock', marginTop: '10px' }}>进行中</span> </div>
                </List.Item>
            </List>
            {/* <Newpersonalk/> */}
            {/* <PersonalLook/> */}
            {/* <Personaselect/> */}
            </div>
    }
}


//新建个人PK
// import React from "react";
// import TestWrapper from "./namePicker"
// import { DatePicker, List, TextareaItem, Picker, Form } from 'antd-mobile';
// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);
// // GMT is not currently observed in the UK. So use UTC now.
// const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// // Make sure that in `time` mode, the maxDate and minDate are within one day.
// let minDate = new Date(nowTimeStamp - 1e7);
// const maxDate = new Date(nowTimeStamp + 1e7);
// // console.log(minDate, maxDate);
// if (minDate.getDate() !== maxDate.getDate()) {
//     // set the minDate to the 0 of maxDate
//     minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
// }


// class Pk extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             date: now,
//             time: now,
//             utcDate: utcNow,
//             dpValue: null,
//             customChildValue: null,
//             visible: false,
           
//         }
//     }
//     render() {
//         return <div>
//             <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
//                 <DatePicker
//                     mode="date"
//                     title="Select Date"
//                     extra="Optional"
//                     value={this.state.date}
//                     onChange={date => this.setState({ date })}
//                 >
//                     <List.Item arrow="horizontal">发起日期：</List.Item>
//                 </DatePicker>
//                 <DatePicker
//                     mode="date"
//                     title="Select Date"
//                     extra="Optional"
//                     value={this.state.date}
//                     onChange={date => this.setState({ date })}
//                 >
//                     <List.Item arrow="horizontal">结束日期：</List.Item>
//                 </DatePicker>
//                 {/* 选择名字 */}
//                 <TestWrapper/>
//             </List>

//             <TextareaItem
//                 title="Pk奖励："
//                 placeholder="你的赌注是什么呢？"
//                 data-seed="logId"
//                 autoHeight
//                 ref={el => this.customFocusInst = el}
//             />
//             <div style={{ marginTop: '20px', display: 'flex' }}>
//                 <button style={{ width: '96%', borderRadius: "6px", background: '#33a3f4', color: 'white', border: 'none', height: '30px' }} >确认</button>
//                 <button style={{ width: '96%', borderRadius: "6px", background: '#33a3f4', color: 'white', border: 'none', height: '30px' }}>重置</button>
//             </div>
//         </div>
//     }
// }
 
// 查看个人Pk
// import React from "react";
// import { Pagination } from 'antd-mobile'
// const locale = {
//     prevText: '《',
//     nextText: '》',
// };
// class Pk extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {


//         }
//     }
//     render() {
//         return <div>
//             <div style={{paddingTop:'0px'}}>
//                 <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>发起人：</span><font style={{ fontSize: '14px' }}>刘晓鹏</font></p>
//                 <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>发起日期：</span><font style={{ fontSize: '14px' }}>2019-02-18</font></p>
//                 <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>结束日期：</span><font style={{ fontSize: '14px' }}>2019-02-1</font></p>
//                 <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>被挑战者：</span><font style={{ fontSize: '14px' }}>张乃兵</font></p>
//                 <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>PK奖励：</span><font style={{ fontSize: '14px' }}>棒棒糖</font></p>
//             </div>
//             <div className="pagination-container" >
//                 <p className="sub-title" style={{color:'#968875',textAlign:'center',height:'30px',lineHeight:'30px'}}>个人每天公里数</p>
//                    <ul style={{listStyle:'none',display:'flex',marginLeft:'30px'}}>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>2019-02-21</li>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>30</li>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>10</li>
//                    </ul>
//                    <ul style={{listStyle:'none',display:'flex',marginLeft:'30px'}}>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>2019-02-21</li>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>30</li>
//                        <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>10</li>
//                    </ul>
//                 <Pagination total={5} current={1} locale={locale} />
//             </div>
//         </div>
//     }
// }


// 个人PK筛选
// import React from "react";
// import "./index.less";
// import { List, Badge } from 'antd-mobile'

// class Pk extends React.Component {
//     constructor(props) {
//         super(props)
//         this.handleClick = this.handleClick.bind(this);
//         this.state = {
//             isToggleOn: true,
//             dispaly: 'none',
//             defaultWidth: false
//         }
//     }
//     handleClick() {
//         this.setState(prevState => ({
//             isToggleOn: !prevState.isToggleOn,
//             display: prevState.isToggleOn ? 'none' : 'block',
//             defaultWidth: !this.state.defaultWidth
//         }));
//     }

//     render() {
//         let styleObj = {
//             borderRadius: "6px", background: '#33a3f4', border: 'none', height: '30px', marginLeft: '1%',
//             width: this.state.defaultWidth ? '47%' : '98%',
//             background: this.state.defaultWidth ? '#33a3f4' : '#ffffff',
//             color: this.state.defaultWidth?'#ffffff':'#000000'
//         }
//         return <div>
//             <div className="btns" style={{ display:this.state.isToggleOn?'none':'block'  }}>
//                 <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起日期区间</p>
//                 <button className="btnStyle btnLeft">今天</button>
//                 <button className="btnStyle">本周内</button>
//                 <button className="btnStyle">本月内</button>
//                 <button className="btnStyle">本季度</button>
//                 <div>
//                     <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起人性别</p>
//                     <div style={{ textAlign: 'left' }}>
//                         <button className="btnStyle btnLeft">全部</button><button className="btnStyle">男</button><button className="btnStyle">女</button>
//                     </div>
//                 </div>
//                 <div>
//                     <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>发起人所属部门</p>
//                     <button className="btnStyle btnLeft">产品中心</button>
//                     <button className="btnStyle">前端开发部</button>
//                     <button className="btnStyle">后端开发部</button>
//                     <div style={{ textAlign: 'left', marginLeft: '24px', marginTop: '10px' }}>
//                         <button className="btnStyle">测试部</button>
//                         <button className="btnStyle">质量保障部</button>
//                     </div>
//                 </div>
//                 <div>
//                     <p style={{ textAlign: 'left', marginLeft: '16px', fontSize: '16px', padding: '16px 10px' }}>PK状态</p>
//                     <button className="btnStyle btnLeft">全部</button>
//                     <button className="btnStyle">通知中</button>
//                     <button className="btnStyle">进行中</button>
//                     <button className="btnStyle">已完成</button>
//                 </div>
//             </div>
//             <div style={{ marginTop: '16px', marginLeft: '4%', display: 'flex' }}>
//                 <button style={{ color: 'white', borderRadius: "6px", background: '#33a3f4', border: 'none', width: '47%', height: '30px', display: this.state.isToggleOn?'none':'block'  }}>重置</button>
//                 <button style={styleObj} onClick={this.handleClick}>  {this.state.isToggleOn ? '条件筛选' : '确定'}</button>
//             </div>
//             <div>
//                 <List renderHeader={() => '查询结果'} className="my-list">
//                     <List.Item arrow="horizontal">
//                         <Badge text={0} style={{ marginLeft: '12px' }}><span style={{ fontSize: "14px" }}>刘然</span><span style={{ fontSize: "14px", marginLeft: '20px' }}>2019-2-18</span><span style={{ fontSize: "14px", marginLeft: '20px' }}>2019-2-18</span></Badge>
//                         <div style={{ float: "right", fontSize: "12px" }}> <span>康贝</span><br /><span style={{ color: 'red', display: 'inlineBlock', marginTop: '12px' }}>进行中</span> </div>
//                     </List.Item>
//                 </List>
//             </div>
             
//         </div>
//     }
// }
export default Pk;