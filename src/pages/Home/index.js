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
                        <p className="getName"> {newList[i]?(newList[i].RunDistanceNum===0?"尴尬了":newList[i].UserName):"尴尬了"}</p>
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

        return (<div>
            <NoticeBar marqueeProps={{loop: true, style: {padding: '0 7.5px'}}}>
                Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
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