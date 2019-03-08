import React, { Component } from 'react';
import { WhiteSpace, Carousel, WingBlank, Card } from 'antd-mobile';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {actionCreators} from './store';
import "../../common.less";
import "./index.less"
class Sport extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 150,
    }
    componentDidMount() {
        // simulate img loading
        // const {getMySportList} = this.props;
        //this.props.getMySportList()
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);

    }
    render() {
        const {location} = this.props;
        console.log(location)
        return (
            <div className="sportPlane">
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
                                        <Link to='/sport/mySport'>
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
const mapState = (state) => ({

})
const mapDispatch = (dispatch) => ({

})
export default connect(mapState,mapDispatch)(Sport);