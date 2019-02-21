// import React from "react";
// import { List,NavBar, Icon,Badge,Popover} from 'antd-mobile';
// const Item = Popover.Item;

// class Pk extends React.Component{
//     constructor(props){
//         super(props)
//         this.state={
//           visible: false,
//           selected: '',
//         }
//       }
//           onSelect = (opt) => {
//             // console.log(opt.props.value);
//             this.setState({
//               visible: false,
//               selected: opt.props.value,
//             });
//           };
//           handleVisibleChange = (visible) => {
//             this.setState({
//               visible,
//             });
//           };
//     render(){
//       // const { getFieldProps } = this.props.form;
//         return <div>
//  <NavBar
//         mode="light"
//         rightContent={
//           <Popover mask
//             overlayClassName="fortest"
//             overlayStyle={{ color: 'currentColor' }}
//             visible={this.state.visible}
//             overlay={[
//               (<Item key="4" value="scan" data-seed="logId">新建</Item>),
//               (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>筛选</Item>),
//             ]}
//             align={{
//               overflow: { adjustY: 0, adjustX: 0 },
//               offset: [-10, 0],
//             }}
//             onVisibleChange={this.handleVisibleChange}
//             onSelect={this.onSelect}
//           >
//              <div style={{
//               height: '100%',
//               padding: '0 15px',
//               marginRight: '-15px',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//             >
//               <Icon type="ellipsis" />
//             </div>
//           </Popover>
//         }
//       >
//         NavBar
//       </NavBar>
//         <List renderHeader={() => '情况如下'} className="my-list">
//         <List.Item arrow="horizontal">
//       <Badge text={0} style={{ marginLeft: 12 }}><span style={{fontSize:"0.3rem"}}>刘然</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span></Badge>
//       <div style={{float:"right",fontSize:"0.2rem"}}> <span>康贝</span><br/><span style={{color:'red',display:'inlineBlock',marginTop:'0.1rem'}}>进行中</span> </div>
//     </List.Item>
//       </List>
//        </div>
//     }
// }


//新建个人PK
// import React from "react";
// import { NavBar, Icon, DatePicker, List, Button, TextareaItem, InputItem, Form, WhiteSpace } from 'antd-mobile';
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

// //  
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
//             <NavBar
//                 mode="light"
//                 icon={<Icon type="left" />}
//                 onLeftClick={() => console.log('onLeftClick')}
//             >新建个人PK</NavBar>
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
//             </List>
//             <List>
//                 <InputItem
//                     placeholder="请输入您所要PK的姓名"
//                     ref={el => this.labelFocusInst = el}
//                 ><div onClick={() => this.labelFocusInst.focus()}>姓名：</div></InputItem>
//                 <TextareaItem
//                     title="Pk奖励："
//                     placeholder="你的赌注是什么呢？"
//                     data-seed="logId"
//                     autoHeight
//                     ref={el => this.customFocusInst = el}
//                 />
//             </List>

//             <div style={{ marginTop: '0.6rem' }}>
//                 <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "0.2rem", background: '#33a3f4', color: 'white' }} >确认</Button><WhiteSpace />
//                 <Button style={{ width: '96%', marginLeft: '2%', borderRadius: "0.2rem", background: '#33a3f4', color: 'white' }}>重置</Button><WhiteSpace />
//             </div>
//         </div>
//     }
// }
// position:'fixed',display:'flex',bottom:'1rem',left:'24%'

// 查看个人Pk
import React from "react";
import { NavBar, Icon, Pagination } from 'antd-mobile'


//  
const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};
class Pk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {


        }
    }
    render() {
        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
            >查看个人PK</NavBar>
            <div>
                <p style={{ height: '0.8rem', lineHeight: '0.8rem', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '0.33rem' }}>发起人：</span><font style={{ fontSize: '0.3rem' }}>刘晓鹏</font></p>
                <p style={{ height: '0.8rem', lineHeight: '0.8rem', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '0.33rem' }}>发起日期：</span><font style={{ fontSize: '0.3rem' }}>2019-02-18</font></p>
                <p style={{ height: '0.8rem', lineHeight: '0.8rem', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '0.33rem' }}>结束日期：</span><font style={{ fontSize: '0.3rem' }}>2019-02-1</font></p>
                <p style={{ height: '0.8rem', lineHeight: '0.8rem', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '0.33rem' }}>被挑战者：</span><font style={{ fontSize: '0.3rem' }}>张乃兵</font></p>
                <p style={{ height: '0.8rem', lineHeight: '0.8rem', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '0.33rem' }}>PK奖励：</span><font style={{ fontSize: '0.3rem' }}>棒棒糖</font></p>
            </div>
            <div className="pagination-container" >
                <p className="sub-title" style={{color:'#968875'}}>个人每天公里数</p>
                   <ul style={{listStyle:'none',display:'flex'}}>
                       <li style={{width:'30%'}}>2019-02-21</li>
                       <li style={{width:'30%'}}>30</li>
                       <li style={{width:'30%'}}>10</li>
                   </ul>
                   <ul style={{listStyle:'none',display:'flex'}}>
                       <li style={{width:'30%'}}>2019-02-21</li>
                       <li style={{width:'30%'}}>30</li>
                       <li style={{width:'30%'}}>10</li>
                   </ul>
                <Pagination total={5} current={1} locale={locale} />
            </div>
        </div>
    }
}


// 个人PK筛选
// import React from "react";
// import { NavBar, Icon,Button,List,Badge} from 'antd-mobile' 
// class Pk extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {


//         }
//     }
//     render() {
//         return <div>
//              <NavBar
//                 mode="light"
//                 icon={<Icon type="left" />}
//                 onLeftClick={() => console.log('onLeftClick')}
//             >个人PK</NavBar>

//           <p style={{textAlign:'left',marginLeft:'0.4rem',fontSize:'0.3rem'}}>发起日期区间</p>
//           {<Button type="primary" size="small" inline>今天</Button>} &nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline style={{}}>本周内</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>本月内</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>本季度</Button>}

//           <div>
//           <p style={{textAlign:'left',marginLeft:'0.4rem',fontSize:'0.3rem'}}>发起人性别</p>
//            <div style={{textAlign:'left',marginLeft:'0.7rem'}}>
//            {<Button type="primary" size="small" inline>全部</Button>} &nbsp;&nbsp;&nbsp;
//            {<Button size="small" inline>男</Button>}&nbsp;&nbsp;&nbsp;
//            {<Button size="small" inline>女</Button>}
//            </div>
//           </div>
//           <div>
//           <p style={{textAlign:'left',marginLeft:'0.4rem',fontSize:'0.3rem'}}>发起人所属部门</p>
//           {<Button type="primary" size="small" inline>产品中心</Button>} &nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>前端开发部</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>后台开发部</Button>}&nbsp;&nbsp;&nbsp;
//           <div style={{textAlign:'left',marginLeft:'0.65rem',marginTop:'0.2rem'}}>
//           {<Button size="small" inline>测试部</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>质量保障部</Button>}
//           </div>
//           </div>
//           <div>
//           <p style={{textAlign:'left',marginLeft:'0.4rem',fontSize:'0.3rem'}}>PK状态</p>
//           {<Button type="primary" size="small" inline>全部</Button>} &nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>通知中</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>进行中</Button>}&nbsp;&nbsp;&nbsp;
//           {<Button size="small" inline>已完成</Button>}
//           </div>
//           <div style={{ marginTop: '0.6rem' }}>
//                 <button style={{color:'white',borderRadius: "0.1rem", background: '#33a3f4',border:'none',width:'47%',height:'0.6rem'}}>重置</button>
//                 <button style={{color:'white',borderRadius: "0.1rem", background: '#33a3f4',border:'none',width:'47%',height:'0.6rem',marginLeft:'1%'}}>确认</button>
//              </div>
//              <div>
//              <List renderHeader={() => '查询结果'} className="my-list">
//        <List.Item arrow="horizontal">
//        <Badge text={0} style={{ marginLeft: 12 }}><span style={{fontSize:"0.3rem"}}>刘然</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span></Badge>
//        <div style={{float:"right",fontSize:"0.2rem"}}> <span>康贝</span><br/><span style={{color:'red',display:'inlineBlock',marginTop:'0.1rem'}}>进行中</span> </div>
//      </List.Item>
//        </List>
//              </div>
//         </div>
//     }
// }

export default Pk;