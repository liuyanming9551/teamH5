// import React from "react";
// import {Modal, WhiteSpace,List,Badge} from 'antd-mobile';
// const operation = Modal.operation;
// class Pk extends React.Component {
//     render() {
//         return <div>
//         <div style={{width:'100%',textAlign:'center',height:'100%',marginTop:"46%"}}>
//           <WhiteSpace size="lg"/>
//           <img style={{width:'40px',height:'40px'}} onClick={this.showShareActionSheet} src={require("./../../test/add.png")} onClick={() => operation([
//             { text: '新建', onPress: () => console.log() },
//             { text: '筛选', onPress: () => console.log('置顶聊天被点击了') },
//           ])}
//           ></img>
//         </div>
//             <List renderHeader={() => '情况如下'} className="my-list" style={{textAlign:'center'}}>
//                 <List.Item arrow="horizontal">
//                     <Badge text={0} style={{ marginLeft: 12 }}><span style={{ fontSize: "0.3rem" }}>刘然</span><span style={{ fontSize: "0.3rem", marginLeft: '0.15rem' }}>2019-2-18</span><span style={{ fontSize: "0.3rem", marginLeft: '0.15rem' }}>2019-2-18</span></Badge>
//                     <div style={{ float: "right", fontSize: "0.2rem" }}> <span>康贝</span><br /><span style={{ color: 'red', display: 'inlineBlock', marginTop: '0.1rem' }}>进行中</span> </div>
//                 </List.Item>
//             </List>
//         </div>
//     }
// }


//新建个人PK
import React from "react";
import { DatePicker, List, Button, TextareaItem, InputItem, WhiteSpace } from 'antd-mobile';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

 
class Pk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: now,
            time: now,
            utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            visible: false,

        }
    }
    render() {
        return <div>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">发起日期：</List.Item>
                </DatePicker>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">结束日期：</List.Item>
                </DatePicker>
            </List>
                <InputItem
                    placeholder="请输入您所要PK的姓名"
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>姓名：</div></InputItem>
                <TextareaItem
                    title="Pk奖励："
                    placeholder="你的赌注是什么呢？"
                    data-seed="logId"
                    autoHeight
                    ref={el => this.customFocusInst = el}
                />
            <div style={{ marginTop: '20px' }}>
                <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "6px", background: '#33a3f4', color: 'white' }} >确认</Button><WhiteSpace />
                <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "6px", background: '#33a3f4', color: 'white' }}>重置</Button><WhiteSpace />
            </div>
        </div>
    }
}

// 查看个人Pk
// import React from "react";
// import { Pagination } from 'antd-mobile'
// const locale = {
//     prevText: 'Prev',
//     nextText: 'Next',
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
// import {List,Badge} from 'antd-mobile' 
// class Pk extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//         }
//     }
//     render() {
//         return <div>
//           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px',padding:'16px 10px'}}>发起日期区间</p>
//          <button className="btnStyle btnLeft">今天</button>
//          <button className="btnStyle">本周内</button>
//          <button className="btnStyle">本月内</button>
//          <button className="btnStyle">本季度</button>

//           <div>
//           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px',padding:'16px 10px'}}>发起人性别</p>
//            <div style={{textAlign:'left'}}>
//            <button className="btnStyle btnLeft">全部</button><button className="btnStyle">男</button><button className="btnStyle">女</button>
//            </div>
//           </div>
//           <div>
//           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px',padding:'16px 10px'}}>发起人所属部门</p>
//           <button className="btnStyle btnLeft">产品中心</button>
//           <button className="btnStyle">前端开发部</button>
//           <button className="btnStyle">后端开发部</button>
//           <div style={{textAlign:'left',marginLeft:'24px',marginTop:'10px'}}>
//            <button className="btnStyle">测试部</button>
//            <button className="btnStyle">质量保障部</button>
//           </div>
//           </div>
//           <div>
//           <p style={{textAlign:'left',marginLeft:'16px',fontSize:'16px',padding:'16px 10px'}}>PK状态</p>
//             <button className="btnStyle btnLeft">全部</button>
//             <button className="btnStyle">通知中</button>
//             <button className="btnStyle">进行中</button>
//             <button className="btnStyle">已完成</button>
//           </div>
//           <div style={{ marginTop: '16px' ,marginLeft:'4%' }}>
//                 <button style={{color:'white',borderRadius: "6px", background: '#33a3f4',border:'none',width:'47%',height:'30px'}}>重置</button>
//                 <button style={{color:'white',borderRadius: "6px", background: '#33a3f4',border:'none',width:'47%',height:'30px',marginLeft:'1%'}}>确认</button>
//              </div>
//              <div>
//              <List renderHeader={() => '查询结果'} className="my-list">
//        <List.Item arrow="horizontal">
//        <Badge text={0} style={{ marginLeft: '12px'}}><span style={{fontSize:"14px"}}>刘然</span><span style={{fontSize:"14px",marginLeft:'20px'}}>2019-2-18</span><span style={{fontSize:"14px",marginLeft:'20px'}}>2019-2-18</span></Badge>
//        <div style={{float:"right",fontSize:"12px"}}> <span>康贝</span><br/><span style={{color:'red',display:'inlineBlock',marginTop:'12px'}}>进行中</span> </div>
//      </List.Item>
//        </List>
//              </div>
//         </div>
//     }
// }


export default Pk;