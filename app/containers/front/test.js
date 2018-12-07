import React from "react";
import echarts from "echarts";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.chart);

    // 指定图表的配置项和数据
    var option = {
      title: {
        // text: "深圳月最低生活费组成（单位:元）",
        // subtext: "From ExcelHome",
        // sublink: "http://e.weibo.com/1341556070/AjQH99che"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow"
        },
        formatter: function(params) {
          // 默认为直线，可选为：'line' | 'shadow'
          var tar = params[1];
          return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        }
      },
      xAxis: {
        type: "category",
        splitLine: { show: false },
        data: ["周一", "周二", "周三", "周四", "周五", "周六"]
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "scatter1",
          data: [
            ["周一", 2000],
            ["周二", 2900],
            ["周三", 1700],
            ["周四", 1400],
            ["周五", 1200],
            ["周六", 300]
          ],
          type: "scatter"
        },
        {
          name: "scatter2",
          data: [
            ["周一", 2800],
            ["周二", 4100],
            ["周三", 3000],
            ["周四", 2600],
            ["周五", 2200],
            ["周六", 1600]
          ],
          type: "scatter"
        },
        {
          name: "辅助",
          type: "bar",
          stack: "总量",
          itemStyle: {
            normal: { barBorderColor: "rgba(0,0,0,0)", color: "rgba(0,0,0,0)" },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: { normal: { show: true, position: "" } },
          data: [2000, 1200, 300, 200, 900, 300]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: { normal: { show: true, position: "" } },
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(100,255,100,0.5)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(100,255,100,0.5)"
            }
          },
          data: [800, 1200, 1300, 1200, 1000, 1300]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: { normal: { show: true, position: "" } },
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(200,100,255,1)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(200,100,255,1)"
            }
          },
          data: [1200, 1200, 1300, 1200, 1000, 1300]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    this.setState({ myChart });
  }

  render() {
    return (
      <div
        id="main"
        style={{ width: 1000, height: 600 }}
        ref={ref => (this.chart = ref)}
      />
    );
  }
}

export default App;
