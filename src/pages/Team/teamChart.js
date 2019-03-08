import React,{PureComponent} from "react";
import {actionCreators} from './store';
import {connect} from 'react-redux';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
class TeamChart extends PureComponent {
    componentDidMount() {
        this.props.changeTeamData()
    }
    render() {
        const { teamData,teamGroupList } = this.props;
        const teamDataInfo = teamData.toJS();
        const teamGroupListInfo = teamGroupList.toJS();
        const ds = new DataSet();
        const dv = ds.createView().source(teamDataInfo);
        dv.transform({
            type: "fold",
            fields: teamGroupListInfo,
            // 展开字段集
            key: "组",
            // key字段
            value: "运动量" // value字段
        });
        return (
            <div>
                <Chart height={300} data={dv} forceFit>
                    <Axis name="组" />
                    <Axis name="运动量" />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="组*运动量"
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
    teamData:state.getIn(["team",'teamData']),
    teamGroupList:state.getIn(["team",'teamGroupList'])
})
const mapDispatch = (dispatch) => ({
    changeTeamData(){
        dispatch(actionCreators.getTeamData())
    }
})
export default connect(mapProps,mapDispatch)(TeamChart)

