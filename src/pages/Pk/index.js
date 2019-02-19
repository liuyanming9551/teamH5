import React from "react";
import { List,NavBar, Icon,Badge} from 'antd-mobile';
 
class Pk extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        return <div>
    <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => console.log('onLeftClick')}
      rightContent={[
        
        <Icon key="1" type="ellipsis"   onClick={()=>console.log('jkshjsjk')} />,
      ]}
    >个人PK</NavBar>
        <List renderHeader={() => '情况如下'} className="my-list">
        <List.Item arrow="horizontal">
      <Badge text={0} style={{ marginLeft: 12 }}><span style={{fontSize:"0.3rem"}}>刘然</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span><span style={{fontSize:"0.3rem",marginLeft:'0.15rem'}}>2019-2-18</span></Badge>
      <div style={{float:"right",fontSize:"0.2rem"}}> <span>康贝</span><br/><span style={{color:'red',display:'inlineBlock',marginTop:'0.1rem'}}>进行中</span> </div>
    </List.Item>
      </List>
       </div>
    }
}
 

// ReactDOM.render(<Personalpk/>,document.querySelector("app"));
export default Pk;