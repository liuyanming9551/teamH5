import React, { Component } from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import "./index.less";
export default class UserInfo extends Component {
    render() {
        return (
            <div className="userInner">
                <Flex>
                    <Flex.Item>
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")}></img>
                    </Flex.Item>
                    <Flex.Item className="desc">这是图片1</Flex.Item>
                </Flex>
            </div>
        )
    }
}