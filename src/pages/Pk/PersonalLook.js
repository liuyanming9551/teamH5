import React from "react";
import { Pagination } from 'antd-mobile'
const locale = {
    prevText: '《',
    nextText: '》',
};
class PersonalLook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {


        }
    }
    render() {
        return <div>
            <div style={{paddingTop:'0px'}}>
                <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>发起人：</span><font style={{ fontSize: '14px' }}>刘晓鹏</font></p>
                <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>发起日期：</span><font style={{ fontSize: '14px' }}>2019-02-18</font></p>
                <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>结束日期：</span><font style={{ fontSize: '14px' }}>2019-02-1</font></p>
                <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>被挑战者：</span><font style={{ fontSize: '14px' }}>张乃兵</font></p>
                <p style={{ height: '40px', lineHeight: '40px', background: 'white', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px', borderBottom: 'solid 1px #f2f2f2' }}><span style={{ fontSize: '16px' }}>PK奖励：</span><font style={{ fontSize: '14px' }}>棒棒糖</font></p>
            </div>
            <div className="pagination-container" >
                <p className="sub-title" style={{color:'#968875',textAlign:'center',height:'30px',lineHeight:'30px'}}>个人每天公里数</p>
                   <ul style={{listStyle:'none',display:'flex',marginLeft:'30px'}}>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>2019-02-21</li>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>30</li>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>10</li>
                   </ul>
                   <ul style={{listStyle:'none',display:'flex',marginLeft:'30px'}}>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>2019-02-21</li>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>30</li>
                       <li style={{width:'30%',height:'30px',lineHeight:'30px'}}>10</li>
                   </ul>
                <Pagination total={5} current={1} locale={locale} />
            </div>
        </div>
    }
}
export default PersonalLook;