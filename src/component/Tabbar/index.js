import React from "react";
import { TabBar, NavBar, Icon } from 'antd-mobile';
import Home from "./../../pages/Home";
import Sport from "./../../pages/Sport";
import Pk from "./../../pages/Pk";
import Team from "./../../pages/Team";
import My from "./../../pages/My";
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
    };
  }

  renderContent(pageText) {
    switch (pageText) {
      case 'Home':
        return <Home />
      case 'Sport':
        return <Sport />
      case 'Pk':
        return <Pk />
      case 'Team':
        return <Team />
      case 'My':
        return <My />
      default:
        return false;
    }
  }

  render() {
    return (

      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>

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
            selected={this.state.selectedTab === 'blueTab'}

            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Home')}
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
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Sport')}
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
            selected={this.state.selectedTab === 'pinkTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'pinkTab',
              });
            }}
          >
            {this.renderContent('Pk')}
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
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Team')}
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
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample