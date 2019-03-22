import React,{PureComponent} from "react";
import {actionCreators} from './store';
import {connect} from 'react-redux';
import {
    Chart,
    Geom,
    Axis,
    Coord,
    Tooltip,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
class PersonChart extends PureComponent {
    componentDidMount() {
        this.props.changePersonData()
    }
    render() {
        const { personData,personGroupList } = this.props;
        const personDataInfo = personData.toJS();
        const personGroupListInfo = personGroupList.toJS();
        const ds = new DataSet();
        const dv = ds.createView().source(personDataInfo);
        dv.transform({
            type: "fold",
            fields: personGroupListInfo,
            // 展开字段集
            key: "个人",
            // key字段
            value: "运动量" // value字段
        });
        return (
            <div>
                <Chart height={300} width={300} data={dv} forceFit>
                    <Axis name="个人" />
                    <Axis name="运动量" />
                    <Legend />
                    <Coord transpose scale={[1, -1]} />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="个人*运动量"
                        color={"name"}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}
                    />
                </Chart>
            </div>
        );
    }
}
const mapProps = (state) =>({
    personData:state.getIn(["team",'personData']),
    personGroupList:state.getIn(["team",'personGroupList'])
})
const mapDispatch = (dispatch) => ({
    changePersonData(){
        dispatch(actionCreators.getPersonData())
    }
})
export default connect(mapProps,mapDispatch)(PersonChart)

