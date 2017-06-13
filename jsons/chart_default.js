/**
 * Created by Administrator on 2016/11/25.
 */
import indexConfig from '../jsons/index_config'

const Highcharts = 'Highcharts'

const yAxisLabel = indexConfig.value_ratio === 0 ?
    function () {
      return Highcharts.numberFormat(this.value, 0, '', ',')
    } : indexConfig.value_ratio === 1 ?
    function () {
      return this.value
    } :
    function () {
      return `${this.value}${indexConfig.value_suffix}`
    }

export default
{
  global: {
    useUTC: false,
  },
  colors: ['#e1203b', '#003399', '#87d92d', '#FF9900', '#24CBE5', '#FF6600', '#FFCC00', '#009966'],
  chart: {
    type: 'spline',
    backgroundColor: '#fafafa',
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
      if (td === 'week') {
        const end = (this.x + 6 * 3600 * 24 * 1000) < Date.parse(new Date()) ? (this.x + 6 * 3600 * 24 * 1000) : Date.parse(new Date())
        content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年%m月%d日(周%W)', this.x)}至${Highcharts.dateFormat('%Y年%m月%d日(周%W)', end)}</span><br>`
      } else if (td === 'month') {
        content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年%m月', this.x)}</span><br>`
      } else if (td === 'year') {
        content = `<span style="font-size:13px;font-weight:bold;">日期：${Highcharts.dateFormat('%Y年', this.x)}</span><br>`
      }
      content += `<div style="display:inline-block; float: left; position: relative; clear: both;"><span style="display:inline-block;width:160px;text-align:left;"><span style="color: ${this.series.color}">${this.series.name}</span>: <b>${this.point.value_arr.value1}</b></span><br/>`
      for (const k in this.point.value_arr) {
        if (k !== 'value1') {
          if (this.point.value_arr[k] !== '') {
            if (parseFloat(this.point.value_arr[k]) >= 0) {
              content += `${k}：<span style="display:inline-block;color:#db0000; width: 60px;text-align:left;">+${this.point.value_arr[k]}%</span><br/>`
            } else {
              content += `${k}：<span style="display:inline-block;color:#129e00; width:60px;text-align:left;">${this.point.value_arr[k]}%</span><br/>`
            }
          }
        }
      }
      if (this.point.dataLabels) {
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
      formatter: yAxisLabel,
    },
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
  series: null,
}

