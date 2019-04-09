import React from "react";
import {connect} from "react-redux";

import {
    Chart,
    Geom,
    Axis,
    Tooltip,

} from "bizcharts";

class MySportChart extends React.Component {

    render() {
        const {mySportChartData} = this.props;
        let mySportChartList = '';
        if(mySportChartData){
            mySportChartList = mySportChartData.toJS();
        }

        const data = [
            {
                date: "04-1",
                value: 1
            },
            {
                date: "04-2",
                value: 3
            },
            {
                date: "04-3",
                value: 3
            },
            {
                date: "04-4",
                value: 3
            },
            {
                date: "04-5",
                value: 3
            },
            {
                date: "04-6",
                value: 3
            },
            {
                date: "04-7",
                value: 3
            }
        ];
        const cols = {
            value: {
                min: 0
            },
            date: {
                range: [0, 1]
            }
        };
        return (
            <div>
                <Chart height={300} data={mySportChartList} style={{paddingRight:'40px'}} scale={cols} forceFit>
                    <Axis name="date" />
                    <Axis name="value" label={{
                        formatter: val => `${val}km`
                    }} />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="date*value" size={2} />
                    <Geom
                        type="point"
                        position="date*value"
                        size={4}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
const mapProps = (state) =>({
    mySportChartData:state.getIn(['sport','mySportChartData'])
})
const mapDispatch = (dispatch) => ({

})
export default connect(mapProps,mapDispatch)(MySportChart)