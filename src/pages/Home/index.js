import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {NoticeBar, Card, WingBlank, WhiteSpace,Button,} from 'antd-mobile';
import {actionCreators} from './store';
import "./index.less";
import {baseUrl} from "../../request";

const goldImgList = ['gold1','gold2','gold3']
class Home extends PureComponent {
    getList(){
        const {rankList} = this.props;
        const newList = rankList.toJS();
        const pageList = [];
        if(newList.length){
            for(let i = 0;i<3;i++){
                pageList.push(
                    <div key={i} className='goldItem'>
                        <img className='goldIcon' src={`${baseUrl}/termImg/sport/${goldImgList[i]}.jpg`} />
                        <p className="getName"> {newList[i]?(newList[i].RunDistanceNum===0?"虚位以待":newList[i].UserName):"虚位以待"}</p>
                        <h3 className="getLength">{newList[i]?newList[i].RunDistanceNum:"0"}KM</h3>
                    </div>
                )
            }
        }
        return (
            pageList
        )
    }
    componentDidMount() {
        this.props.getRankData();
    }
    render() {
        const {rankList} = this.props;
        const newList = rankList.toJS();
        return (<div>
            <NoticeBar marqueeProps={{loop: true, style: {padding: '0 7.5px'}}}>
                Notice: {newList[0]? (newList[0].RunDistanceNum !== 0 ? `恭喜${newList[0].UserName}荣获上周运动冠军！人生处处PK场，认真对待不恐慌，拼尽全力撑到底，铿锵倒下也无妨！笑迎失败无遗憾，傲立天下我最棒！`:'暂无人上榜~') :''}
            </NoticeBar>
            <div className="paiMing">
                <WingBlank size="md">
                    <WhiteSpace size="md"/>
                    <Card>
                        <Card.Header
                            title="上周运动总里程排名"
                        />
                        <Card.Body>
                            <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                {this.getList()}
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <WingBlank size="md">
                    <WhiteSpace size="md"/>
                    <Card>
                        <Card.Header
                            title="本月运动总里程排名"
                        />
                        <Card.Body>
                            <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                {this.getList()}
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <WingBlank size="md">
                    <WhiteSpace size="md"/>
                    <Card>
                        <Card.Header
                            title="本季度运动总里程排名"
                        />
                        <Card.Body>
                            <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                {this.getList()}
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <WingBlank size="md">
                    <WhiteSpace size="md"/>
                    <Card>
                        <Card.Header
                            title="上季度排名"
                        />
                        <Card.Body>
                            <div style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                {this.getList()}
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </WingBlank>

            </div>
        </div>)
    }
}

const mapStateToprops = (state) => ({
    rankList: state.getIn(['home', 'sportRank'])
})
const mapDispatchToProps = (dispatch) => ({
    getRankData(){
        dispatch(actionCreators.getRankData())
    }
})
export default connect(mapStateToprops, mapDispatchToProps)(Home);