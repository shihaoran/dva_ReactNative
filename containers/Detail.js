import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { connect } from 'dva'
import ChartView from 'react-native-highcharts'
import ModalDropdown from 'react-native-modal-dropdown'

import chartConfig from '../jsons/chart_default'
import dataSeries from '../jsons/test_series'
import indexConfig from '../jsons/index_config'

import Square from '../components/Square'

const Highcharts = 'Highcharts'

@connect()
class Detail extends Component {
  constructor() {
    super()
    this.state = {
      squareList: [{ title: '\u9996\u9875\u7cfb', main: '13.28', b1: '-2.78', b2: '1.36', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: '\u624b\u767e', main: '10.10', b1: '-2.40', b2: '1.37', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: '\u624b\u6d4f', main: '0.18', b1: '-5.51', b2: '1.44', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: 'Wise\u9996\u9875', main: '3.00', b1: '-3.85', b2: '1.35', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }],
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
    const squares = this.state.squareList.map((row, i) => {
      console.log(row)
      return (
        <Square key={row.title} data={row} />
      )
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text/>
        </View>
        <View style={styles.squareList}>
          {squares}
        </View>
        <ChartView style={{ height: 300, width: 400, backgroundColor: 'blue' }} config={this.state.chartConfig} />
        <ModalDropdown options={['option 1', 'option 2']} />
        <Button title="ffff" onPress={this.setConf} />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
  },
  header: {
    marginTop: 0,

  },
  squareList: {
    marginTop: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
})

export default Detail
