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
                <Chart height={300} data={mySportChartList} scale={cols}  style={{background:"rgb(241, 239, 239)",color: "#999",paddingRight:'40px'}} forceFit>
                    <Axis name="date" />
                    <Axis name="value" label={{
                        formatter: val => `${val}km`
                    }} />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line"
                          position="date*value"
                          size={2}
                          tooltip={['date*value', (date, value) => {
                              return {
                                  name: '公里',
                                  title: date,
                                  value: value
                              };
                          }]}
                    />
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