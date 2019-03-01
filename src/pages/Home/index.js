import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {NoticeBar, Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {actionCreators} from './store';
import goldJing from "./../../test/jin.png";
import goldYin from "./../../test/yin.png";
import goldTong from "./../../test/tong.png";
import "./index.less";
const goldList = [goldJing,goldYin,goldTong];
class Home extends PureComponent {
    getList(){
        const {rankList} = this.props;
        const newList = rankList.toJS();
        const pageList = [];
        if(newList.length){
            for(let i = 0;i<2;i++){
                pageList.push(
                    <li key={newList[i].UserName} style={{listStyle: 'none'}}>
                        <img src={goldList[i]}
                             style={{width: '100px', height: '100px'}}/>
                        <p className="getName">{newList[i].UserName}</p>
                        <h3 className="getLength">{newList[i].RunDistanceNum}KM</h3>
                    </li>
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
                            <ul style={{background: 'white', display: 'flex', justifyContent: 'space-around'}}>
                                {this.getList()}
                            </ul>
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