import React from "react";
import { Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';

import { provinceLite } from 'antd-mobile-demo-data'
const colorStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '16px',
  height: '16px',
  marginRight: '10px',
};
const colors = [
  {
    label:
    (<div>
      <span
        style={{ ...colorStyle, backgroundColor: '#FF0000' }}
      />
      <span>红色</span>
    </div>),
    value: '#FF0000',
  },
  {
    label:
    (<div>
      <span
        style={{ ...colorStyle, backgroundColor: '#00FF00' }}
      />
      <span>绿色</span>
    </div>),
    value: '#00FF00',
  },
  {
    label:
    (<div>
      <span
        style={{ ...colorStyle, backgroundColor: '#0000FF' }}
      />
      <span>蓝色</span>
    </div>),
    value: '#0000FF',
  },
];

class Test extends React.Component {
  state = {
    data: [],
    cols: 1,
    visible: false,
    
  };
  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: provinceLite,
      });
    }, 120);
  };
 
  
  onChangeColor = (color) => {
    this.setState({
      colorValue: color,
    });
  };

  render() {
     
    return (<div>
   
      
        <Picker
          data={colors}
          value={this.state.colorValue}
          cols={1}
          onChange={this.onChangeColor}
        >
          <List.Item arrow="horizontal">姓名：</List.Item>
        </Picker>
      
    </div>);
  }
}
const TestWrapper = createForm()(Test);
export default TestWrapper;