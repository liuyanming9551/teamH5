import React,{Component} from 'react';
import { List,WhiteSpace,WingBlank } from 'antd-mobile';

const Item = List.Item;
export default class CheckDetail extends Component{
    render(){
        return (
            <div>
                <List  className="my-list">
                    <Item extra={'李丽'}>姓名</Item>
                    <Item extra={'2019-2-13'}>跑步日期</Item>
                    <Item extra={'23min'}>时长分钟</Item>
                    <Item extra={'5 KM'}>距离（KM）</Item>
                    <Item extra={'07'}>跑步配速</Item>
                    <Item>上传图片</Item>
                </List>
                <WhiteSpace size='lg' />
                <div className="imgViewList">
                    <WingBlank>
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")} alt=""/>
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")} alt=""/>
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")} alt=""/>
                    </WingBlank>
                </div>
            </div>
        )
    }
}