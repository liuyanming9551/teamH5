import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import axios from 'axios';
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '',
            hidden: false
        };
    }

    componentDidMount() {

    }
    renderContent(pageText) {

    }

    render() {
        const {children,location} =this.props;
        const {pathname} = location.location;
        return (
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="Home"
                        icon={<div className="iconfont icon-shouye3" style={{
                            width: '22px',
                            height: '22px',
                            fontSize: "22px"
                        }}
                        />
                        }
                        selectedIcon={<div className="iconfont icon-shouye3" style={{
                            width: '22px',
                            height: '22px',
                            fontSize: "22px"
                        }}
                        />
                        }
                        selected={pathname === '/'}

                        onPress={() => {
                            this.props.location.history.push('/')
                        }}
                        data-seed="logId"
                    >
                        {children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className="iconfont icon-yundong-2" style={{
                            width: '22px',
                            height: '22px',
                            fontSize: "22px"
                        }}
                        />
                        }
                        selectedIcon={
                            <div className="iconfont icon-yundong-2" style={{
                                width: '22px',
                                height: '22px',
                                fontSize: "22px"
                            }}
                            />
                        }
                        title="运动"
                        key="Sport"
                        selected={pathname === '/sport'}
                        onPress={() => {
                            this.props.location.history.push('/sport')
                        }}
                        data-seed="logId1"
                    >
                        {children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="iconfont icon-icon_pk" style={{
                                width: '22px',
                                height: '22px',
                                fontSize: "22px"
                            }}
                            />
                        }
                        selectedIcon={
                            <div className="iconfont icon-icon_pk" style={{
                                width: '22px',
                                height: '22px',
                                fontSize: "22px"
                            }}
                            />
                        }
                        title="个人PK"
                        key="Pk"
                        selected={pathname === '/pk'}
                        onPress={() => {
                            this.props.location.history.push('/pk')
                        }}
                    >
                        {children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="iconfont icon-tuanduihezuo" style={{
                                width: '22px',
                                height: '22px',
                                fontSize: "22px"
                            }}
                            />
                        }
                        selectedIcon={
                            <div className="iconfont icon-tuanduihezuo" style={{
                                width: '22px',
                                height: '22px',
                                fontSize: "22px"
                            }}
                            />
                        }
                        title="团队"
                        key="Team"
                        selected={pathname === '/team'}
                        onPress={() => {
                            this.props.location.history.push('/team')
                        }}
                    >
                        {children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className="iconfont icon-wodekaobei" style={{
                            width: '22px',
                            height: '22px',
                            fontSize: "22px"
                        }}
                        />}
                        selectedIcon={<div className="iconfont icon-wodekaobei" style={{
                            width: '22px',
                            height: '22px',
                            fontSize: "22px"
                        }}
                        />}
                        title="我的"
                        key="My"
                        selected={pathname === '/my'}
                        onPress={() => {
                            this.props.location.history.push('/my')
                        }}
                    >
                        {children}
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}