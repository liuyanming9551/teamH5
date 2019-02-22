import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Team extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main1'));
        var myChart1 = echarts.init(document.getElementById('main2'));
        myChart.setOption({
            title: { 
                text: '本周每小组公里数',
                x:'center',
                y:'20px',
        
        },
            tooltip: {},
            xAxis: {
                data: ["产品中心", "前端开发部", "后台开发部", "测试部", "质量保障部"],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    axisLabel: 0,
                    formatter: function (params) {
                        var newParamsName = "";
                        var paramsNameNumber = params.length;
                        var provideNumber = 3;
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";
                                var start = p * provideNumber;
                                var end = start + provideNumber;
                                if (p === rowNumber - 1) {
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    if (p > 2) {
                                        tempStr = "...";
                                        newParamsName += tempStr;
                                        break;
                                    } else {
                                        tempStr = params.substring(start, end);
                                        if (p < 2) {
                                            tempStr += "\n";
                                        }
                                    }
                                }
                                newParamsName += tempStr;
                            }

                        } else {
                            newParamsName = params;
                        }
                        return newParamsName
                    }
                }
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                itemStyle: {
                    normal: {color: '#33a3f4'}
                },
                  barGap:'-100%',
                  barCategoryGap:'40%',
                  animation: false,
                data: [5, 20, 36, 10, 10]
            }]
        });
        // 绘制图表
        myChart1.setOption({
            title: { 
                text: '所有用户当月运动量',
                x:'center',
                y:'20px',
        
        },
            tooltip: {},
            xAxis: {
                data: ["刘然", "康贝", "刘艳明", "李丽", "刘谋","侯小飞","胡金宝"],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    axisLabel: 0,
                    formatter: function (params) {
                        var newParamsName = "";
                        var paramsNameNumber = params.length;
                        var provideNumber = 1;
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";
                                var start = p * provideNumber;
                                var end = start + provideNumber;
                                if (p === rowNumber - 1) {
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    if (p > 2) {
                                        tempStr = "...";
                                        newParamsName += tempStr;
                                        break;
                                    } else {
                                        tempStr = params.substring(start, end);
                                        if (p < 2) {
                                            tempStr += "\n";
                                        }
                                    }
                                }
                                newParamsName += tempStr;
                            }

                        } else {
                            newParamsName = params;
                        }
                        return newParamsName
                    }
                }
            },
            yAxis: {},
            series: [{
                name: '运动量',
                type: 'bar',
                itemStyle: {
                    normal: {color: '#33a3f4'}
                },
                  barGap:'-100%',
                  barCategoryGap:'40%',
                  animation: false,
                data: [5, 20, 36, 10, 10,19,11]
            }]
        });
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return <div>
            <div style={{display:'flex'}}>
            <div id="main1" style={{ width: '300px', height: '300px' }}></div>
             <div style={{marginTop:'30px'}}>
             <button style={{borderRadius:'4px',background:"#33a3f4",border:'none',color:'white',height:'24px'}}>本周</button><br/>
             <button style={{marginTop:'10px',borderRadius:'4px',border:'none'}}>本月</button><br/>
             <button style={{marginTop:'10px',borderRadius:'4px',border:'none'}}>本季度</button><br/>
             <button style={{marginTop:'10px',borderRadius:'4px',border:'none'}}>本年度</button>
             </div>
            </div>
            <div id="main2" style={{ width: '375px', height: '300px' }}></div>
        </div>
    }
}
export default Team;