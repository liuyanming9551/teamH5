import React from "react";
import { List, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class TextareaItemExample extends React.Component {
  componentDidMount() {
    
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        
          <TextareaItem
            {...getFieldProps('note3')}
            title="PK奖励"
            autoHeight
            labelNumber={5}
          />
          <TextareaItem
            {...getFieldProps('note1')}
            rows={3}
            placeholder="请输入你的赌注"
          />
        
      </div>
    );
  }
}

const TextareaItemExampleWrapper = createForm()(TextareaItemExample);

export default TextareaItemExampleWrapper;