import React, { Component } from 'react';
import { WhiteSpace, Carousel, WingBlank, Card } from 'antd-mobile';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {actionCreators} from './store';
import "../../iconfont/common.css";
import "./index.less"
import {baseUrl} from "../../request";
import MySportChart from './mySportChart';

class Sport extends Component {
    constructor(props){
        super(props)
    }
    state = {
        data: ['sport1', 'sport2', 'sport3'],
        imgHeight: 150,
    }
    componentDidMount() {
        const {changeSportControl,userCode,changeMySportChart} =this.props;
        if(userCode){
            changeSportControl(userCode)
            changeMySportChart(userCode)
        }
        this.props.getBannerData()
    }
    render() {
        const {rightControl, bannerData} =this.props;
        console.log('bannerData', bannerData)
        let data = [];
        if (bannerData) {
            data = bannerData.toJS()
        }
        console.log("data", data)
        return (
            <div className="sportPlane">
                 <header>
                    <WhiteSpace size="sm" />
                    <WingBlank size='md'>
                        <Carousel
                            autoplay={true}
                            infinite
                        >
                            {data.map(val => (
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
                                        src={`${baseUrl}/${val}`}
                                        alt=""
                                        style={{
                                            width: '100%',
                                            verticalAlign: 'top',
                                            borderRadius: "4px",
                                            height: "140px",
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
                                            <div className="sportLinkIcon iconfont icon-yundong3"/>
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

                                        <div className="sportLinksLabel">审核运动</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>
                    <MySportChart />
                </footer>
            </div>
        )
    }
}
const mapState = (state) => ({
    userCode:state.getIn(['login','userCode']),
    rightControl:state.getIn(['sport','rightControl']),
    bannerData: state.getIn(['sport', 'bannerData'])
})
const mapDispatch = (dispatch) => ({
    changeSportControl(userCode){
        dispatch(actionCreators.getSportControl(userCode))
    },
    getBannerData () {
        dispatch(actionCreators.getBannerData())
    },
    changeMySportChart(userCode){
        dispatch(actionCreators.getMySportChart(userCode))
    }
})
export default connect(mapState,mapDispatch)(Sport);