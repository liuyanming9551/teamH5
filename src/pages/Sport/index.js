import React, { Component } from 'react';
import { WhiteSpace, Carousel, WingBlank, Card } from 'antd-mobile';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {actionCreators} from './store';
import "../../iconfont/common.css";
import "./index.less"
import {baseUrl} from "../../request";

class Sport extends Component {
    constructor(props){
        super(props)
    }
    state = {
        data: ['sport1', 'sport2', 'sport3'],
        imgHeight: 150,
    }
    componentDidMount() {
        const {changeSportControl,userCode} =this.props;
        if(userCode){
            changeSportControl(userCode)
        }
    }
    render() {
        const {rightControl} =this.props;
        return (
            <div className="sportPlane">
                 <header>
                    <WhiteSpace size="sm" />
                    <WingBlank size='md'>
                        <Carousel
                            autoplay={true}
                            infinite
                            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            // afterChange={index => console.log('slide to', index)}
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
                                        src={`${baseUrl}/termImg/sport/${val}.jpg`}
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
                                            <div className="sportLinkIcon iconfont icon-yundong3"></div>
                                        </Link>

                                        <div className="sportLinksLabel">我的运动</div>
                                    </div>
                                    <div className="sportLinkItem">
                                        <Link to='/sport/extrasport'>
                                            <div className="sportLinkIcon iconfont icon-yundong2"/>
                                        </Link>

                                        <div className="sportLinksLabel">额外运动</div>
                                    </div>
                                    <div className="sportLinkItem" style={rightControl?{display: "block"}:{display: "none"}}>
                                        <Link to='/sport/check'>
                                            <div className="sportLinkIcon iconfont icon-shape2"/>
                                        </Link>

                                        <div className="sportLinksLabel" style={{marginLeft: "3px"}}>审核</div>
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
    userCode:state.getIn(['login','userCode']),
    rightControl:state.getIn(['sport','rightControl'])
})
const mapDispatch = (dispatch) => ({
    changeSportControl(userCode){
        dispatch(actionCreators.getSportControl(userCode))
    }
})
export default connect(mapState,mapDispatch)(Sport);