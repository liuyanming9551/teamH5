import React, { Component } from 'react';
import { WhiteSpace, Carousel, WingBlank, Card } from 'antd-mobile';
import {Link} from "react-router-dom";
import "../../common.less";
import "./index.less"

import SportList from './mySport/sportLists';
import ViewMySport from './mySport/viewMySport';
import CreateSport from "./mySport/createSport";
import AdjustmentList from "./adjustment";
import CreateAdjustment from "./adjustment/createAdjustment";
import SportCheck from "./sportCheck";
import CheckDetail from "./sportCheck/checkDetail";
class Sport extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 150,
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

            <div className="sportPlane">
                {/*<CheckDetail/>*/}
                {/*<SportCheck/>*/}
                {/*<CreateAdjustment/>*/}
                {/*<AdjustmentList/>*/}
                {/*<CreateSport/>*/}
                {/*<ViewMySport/>*/}
                {/*<SportList/>*/}
                 <header>
                    <WhiteSpace size="sm" />
                    <WingBlank size='md'>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="javascript:;"
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                        height: this.state.imgHeight
                                    }}
                                >
                                    <img
                                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                        alt=""
                                        style={{
                                            width: '100%',
                                            verticalAlign: 'top',
                                            borderRadius: "4px",
                                            height: "140px"
                                        }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                </header>
                <footer>
                    <WingBlank size="md">
                        <WhiteSpace size="md" />
                        <Card>
                            <Card.Body>
                                <div className="sportLinksBox">
                                    <div className="sportLinkItem">
                                        <Link to='/sport/mysport'>
                                            <div className="sportLinkIcon iconfont icon-wodekaobei"></div>
                                        </Link>

                                        <div className="sportLinksLabel">我的运动</div>
                                    </div>
                                    <div className="sportLinkItem">
                                        <Link to='/sport/extrasport'>
                                            <div className="sportLinkIcon iconfont icon-wodekaobei"></div>
                                        </Link>

                                        <div className="sportLinksLabel">额外运动</div>
                                    </div>
                                    <div className="sportLinkItem">
                                        <Link to='/sport/check'>
                                            <div className="sportLinkIcon iconfont icon-wodekaobei"></div>
                                        </Link>

                                        <div className="sportLinksLabel">审核</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>
                </footer>
            </div>
        )
    }
}
export default Sport;