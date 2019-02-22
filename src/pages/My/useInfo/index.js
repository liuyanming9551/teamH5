import React, { Component } from "react";
import { List, Card, WingBlank, WhiteSpace, Button, Carousel } from 'antd-mobile';
import "./index.less";
import ListTmp from "./../list/index.js";

const Item = List.Item;
export default class UserInfo extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 100,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <div className="userInnerWrap">
                <header className="userInner">
                    <div className="userImg">
                        <img src={require("./../../../test/0a9d49c184482ccd.jpg")}></img>
                    </div>
                    <div className="userLabel">
                        <div className="userName">刘艳明</div>
                        <div className="userTitle">高级软件工程师</div>
                        <div className="company">北京易勤信息技术有限公司</div>
                    </div>
                </header>

                <footer className="ownDesc">
                    <WingBlank size="md">
                        <WhiteSpace size="lg" />
                        <Card>
                            <Card.Header className="cardTitle"
                                title="自我评价"

                            />
                            <Card.Body>
                                <div className="evaluateDesc">我是一个对生活充满激情的人。故事和酒我都有，你确定跟不跟我走。</div>
                            </Card.Body>
                            {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>
                            <Card.Header className="cardTitle"
                                title="他人技能"

                            />
                            <Card.Body>
                                <div className="evaluateList">
                                    <Button className="evaluateBtn" inline size="small">美丽（1）</Button>
                                    <Button className="evaluateBtn" inline size="small">大方</Button>
                                    <Button className="evaluateBtn" inline size="small">迷人</Button>
                                    <Button className="evaluateBtn" inline size="small">with icon and inline</Button>
                                    <Button className="evaluateBtn" inline size="small">一点都不好</Button>
                                    <Button className="evaluateBtn" inline size="small">完了,这个人废了（99999）</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>

                    <WingBlank size="md">
                        <Card>

                            <Card.Header className="cardTitle"
                                title="本周排名"
                            />


                            <Card.Body>
                                <span className="rankTitle">第几名：</span>
                                <span className="rank">1</span>
                                <WhiteSpace size="sm" />
                                <Carousel className="space-carousel"
                                    frameOverflow="visible"
                                    cellSpacing={10}
                                    slideWidth="150px"
                                    autoplay={false}
                                    dots={false}
                                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                    afterChange={index => this.setState({ slideIndex: index })}
                                >
                                    {this.state.data.map((val, index) => (
                                        <a
                                            key={val}
                                            style={{
                                                display: 'block',
                                                position: 'relative',
                                                top: this.state.slideIndex === index ? -10 : 0,
                                                height: this.state.imgHeight,
                                                borderRadius:"4px",
                                                background:"#f6f6f64f",
                                                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                            }}
                                        >
                                            <div  className="cardItem"
                                                
                                                style={{ width: '150px', verticalAlign: 'top' }}
                                                onLoad={() => {
                                                    // fire window resize event to change height
                                                    window.dispatchEvent(new Event('resize'));
                                                    this.setState({ imgHeight: 'auto' });
                                                }}
                                            >
                                                <div className="cardDetailWrapInner">
                                                <p className="cardListTitle">今日运动</p>
                                                <div className="cardDetailWrap">
                                                    <span className="cardDetailNum">0</span>
                                                    <span className="cardDetailMin">分钟</span>
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </a>
                                    ))}
                                </Carousel>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>
                    <WingBlank size="md">
                        <Card>

                            <Card.Header className="cardTitle"
                                title="我的段位"
                            />


                            <Card.Body>
                                <img src=""></img>
                            </Card.Body>

                        </Card>
                        <WhiteSpace size="sm" />
                    </WingBlank>

                </footer>
            </div>
        )
    }
}