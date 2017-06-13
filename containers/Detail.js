import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { connect } from 'dva'
import ChartView from 'react-native-highcharts'

import chartConfig from '../jsons/chart_default'
import dataSeries from '../jsons/test_series'
import indexConfig from '../jsons/index_config'

const Highcharts = 'Highcharts'

@connect()
class Detail extends Component {
  constructor() {
    super()
    this.state = {
      chartConfig: {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load() {
              // set up the updating of the chart each second
              const series = this.series[0]
              setInterval(() => {
                let x = (new Date()).getTime(), // current time
                  y = Math.random()
                series.addPoint([x, y], true, true)
              }, 1000)
            },
          },
        },
        title: {
          text: 'Live random data',
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
        },
        yAxis: {
          title: {
            text: 'Value',
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080',
          }],
        },
        tooltip: {
          formatter() {
            return `<b>${this.series.name}</b><br/>${
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br/>${
              Highcharts.numberFormat(this.y, 2)}`
          },
        },
        legend: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        series: [{
          name: 'Random data',
          data: (function () {
            // generate an array of random data
            let data = [],
              time = (new Date()).getTime(),
              i

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random(),
              })
            }
            return data
          }()),
        }],
      },
    }
  }

  setConf = () => {
    chartConfig.series = dataSeries
    const conf1 = chartConfig
    this.setState({
      chartConfig: conf1,
    })
    console.log('dddd')
  }
  renderChart = () => (
    <ChartView style={{ height: 500, width: 400, backgroundColor: 'blue' }} config={this.state.chartConfig} />
  )
  render() {
    const conf = {
      global: {
        useUTC: false,
      },
      colors: ['#e1203b', '#003399', '#87d92d', '#FF9900', '#24CBE5', '#FF6600', '#FFCC00', '#009966'],
      chart: {
        type: 'spline',
        backgroundColor: '#fafafa',
        height: '250',
        zoomType: 'x',
      },
      /* 数据点设置*/
      plotOptions: {
        series: {
          marker: {
            enabled: false, /* 数据点是否显示*/
          },
          events: {
            click(e) {
              if (e.point.url) { window.open(e.point.url) }
            },
          },
          cursor: 'pointer',
        },
        area: {
          fillOpacity: 0.1,
        },
      },
      credits: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
        selected: 1,
      },
      scrollbar: {
        enabled: false,
      },
      legend: {
        enabled: true,
        verticalAlign: 'top',
        align: 'center',
        layout: 'horizontal',
        borderColor: '#16a0d7',
        labelFormatter() {
          return this.name.replace(/\&nbsp;/g, '')
        },
      },
      navigator: {
        xAxis: {
          dateTimeLabelFormats: {
            day: '%Y年',
            week: '%m月%e日',
            month: '%Y年%m月',
            year: '%Y年',
          },
        },
        margin: 30,
        maskFill: 'rgba(136,136,136,0.1)',
      },
      tooltip: {
        formatter() {
          const td = 'day'
          let content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年%m月%d日(周%W)', this.x)}</span><br>`
          if (td == 'week') {
            const end = (this.x + 6 * 3600 * 24 * 1000) < Date.parse(new Date()) ? (this.x + 6 * 3600 * 24 * 1000) : Date.parse(new Date())
            content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年%m月%d日(周%W)', this.x)}至${Highcharts.dateFormat('%Y年%m月%d日(周%W)', end)}</span><br>`
          } else if (td == 'month') {
            content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年%m月', this.x)}</span><br>`
          } else if (td == 'year') {
            content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年', this.x)}</span><br>`
          }
          const valueDecimals = (indexConfig.value_ratio && indexConfig.value_decimals) ? indexConfig.value_decimals : 0
          const valueSuffix = indexConfig.value_suffix
          content += `<div style="display:inline-block; float: left; position: relative; clear: both;"><span style="display:inline-block;width:160px;text-align:left;"><span style="color: ${this.series.color}">${this.series.name}</span>: <b>${this.point.value_arr.value1}</b></span><br/>`
          // var y = Highcharts.numberFormat(this.y, valueDecimals, '.', ',') + valueSuffix;
          for (const k in this.point.value_arr) {
            if (k != 'value1') {
              if (this.point.value_arr[k] != '') {
                if (parseFloat(this.point.value_arr[k]) >= 0) {
                  content += `${k}：<span style="display:inline-block;color:#db0000; width: 60px;text-align:left;">+${this.point.value_arr[k]}%</span><br/>`
                } else {
                  content += `${k}：<span style="display:inline-block;color:#129e00; width:60px;text-align:left;">${this.point.value_arr[k]}%</span><br/>`
                }
              }
            }
          }
          if (this.point.dataLabels) {
            // console.log(this.point.remark.replace(/<br>/g, ""));
            content += `</div><span style="font-size:12px;color:red; display:inline-block;white-space:pre-wrap;overflow:hidden;word-break:break-all;word-wrap:break-word;float:left;clear:both;">【标记：${this.point.remark.replace(/<br>/g, '')}】</span>`
          } else {
            content += '</div>'
          }
          return content
        },
        borderColor: '#6f6f6f',
        borderWidth: 1,
        crosshairs: [true, true],
        shadow: false,
        useHTML: true,
      },
      title: {
        text: '',
        align: 'left',
      },
      xAxis: {
        type: 'datetime',
        opposite: false,
        lineColor: '#6f6f6f',
        lineWidth: 1,
        tickColor: '#fff',
        gridLineWidth: 1,
        gridLineColor: '#eee',
        dateTimeLabelFormats: {
          hour: '%e日%H时',
          day: '%m月%e日',
          week: '%m月%e日',
          month: '%m月',
          year: '%Y年',
        },
        tickPixelInterval: 150,
      },
      yAxis1: {
        title: {
          text: 'Value',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      yAxis: {
        title: {
          style: {
            fontWeight: 'bold',
            fontSize: '10pt',
          },
          text: '',
          align: 'left',
        },
        tickPosition: 'inside',
        opposite: false,
        lineColor: '#6f6f6f',
        lineWidth: 1,
        tickColor: '#c1c1c1',
        gridLineWidth: 1,
        gridLineColor: '#eee',
        offset: 0,
        labels: {
          formatter() {
            return this.value + 5
          },
        },
      },
      exporting: {
        enabled: false,
      },
      series: [{
        name: 'Random data',
        data: (function () {
          // generate an array of random data
          let data = [],
            time = (new Date()).getTime(),
            i

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random(),
            })
          }
          return data
        }()),
      }],
    }
    conf.series = dataSeries
    console.log(conf)
    return (
      <View>
        <ChartView style={{ height: 500, width: 400, backgroundColor: 'blue' }} config={this.state.chartConfig} />
        <Button title="ffff" onPress={this.setConf} />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Detail
