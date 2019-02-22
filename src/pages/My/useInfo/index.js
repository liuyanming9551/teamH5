import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace,Button, } from 'antd-mobile';
import "./index.less";
import List from "./../list/index.js";
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
                    <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                        <Card>
                            <Card.Header
                                title="自我评价"
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            />
                            <Card.Body>
                                <div>我是一个对生活充满激情的人。故事和酒我都有，你确定跟不跟我走。</div>
                            </Card.Body>
                            {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Header
                                title="他人技能"
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            />
                            <Card.Body>
                                <Button icon="check-circle-o" inline size="small">with icon and inline</Button>
                                <Button icon="check-circle-o" inline size="small">with icon and inline</Button>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>
                </section>
                <footer>
                    <List></List>
                </footer>
            </div>
        )
    }
}