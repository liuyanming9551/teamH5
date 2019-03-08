import React,{Component} from 'react';
import { List,WhiteSpace,WingBlank } from 'antd-mobile';

const Item = List.Item;
export default class ViewMySport extends Component{
    render(){
        return (
            <div>
                <List  className="my-list">
                    <Item extra={'2019-2-13'}>跑步日期</Item>
                    <Item extra={'23min'}>时长分钟</Item>
                    <Item extra={'5 KM'}>距离（KM）</Item>
                    <Item extra={'07'}>跑步配速</Item>
                    <Item extra={'已审核'}>审核状态</Item>
                    <Item>上传图片</Item>
                </List>
                <WhiteSpace size='lg' />
                <div className="imgViewList">
                    <WingBlank>
                    <img  alt=""/>
                    <img  alt=""/>
                    <img  alt=""/>
                    </WingBlank>
                </div>
            </div>
        )
    }
}