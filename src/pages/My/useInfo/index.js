import React, { Component } from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import "./index.less";
export default class UserInfo extends Component {
    render() {
        return (
            <div className="userInnerWrap">
                <header className="userInner">
                    <div className="userImg">
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")}></img>
                    </div>
                    <div className="userLabel">
                        <div className="userName">这是用户姓名</div>
                        <div className="userTitle">高级软件工程师</div>
                        <div className="company">北京易勤信息技术有限公司</div>
                    </div>
                </header>

                <section className="ownDesc">
                    我是一个对生后充满激情的人。
                </section>
            </div>
        )
    }
}