import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity, ScrollView, Picker } from 'react-native'
import { connect } from 'dva'

import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modalbox'

import chartConfig from '../jsons/chart_default'
import dataSeries from '../jsons/test_series'

import Square from '../components/Square'
import ChartView from '../libraries/react-native-highcharts-modified'
import ModalDropdown from '../libraries/react-native-modal-dropdown-modified'

@connect(({ app }) => ({ ...app }))
class Detail extends Component {
  constructor() {
    super()
    this.state = {
      timeConditionsList: {
        day: '近一月',
        week: '近三月',
        month: '近六月',
      },
      selectedTimeCondition: 'day',
      language: 'java',
    }
  }

  dropdownRenderRow = (rowData, rowID, highlighted) => (
    <View>
      <Text>
        {rowData.title}
      </Text>
    </View>
    )

  dropdownRenderHeaderText = (rowData) => {
    console.log(rowData)
    return (
      rowData.title
    )
  }

  render() {
    const squares = this.props.detailData.square.map((row, i) => (
      <Square key={row.title} data={row} />
      ))
    const timeConditions = Object.keys(this.state.timeConditionsList).map((row, i) => (
      <TouchableOpacity
        key={row}
        onPress={() => {
          this.setState({
            selectedTimeCondition: row,
          })
        }}
      >
        <Text style={row === this.state.selectedTimeCondition ? styles.chartHeaderItemSelected : styles.chartHeaderItemUnSelected}>{this.state.timeConditionsList[row]}</Text>
      </TouchableOpacity>
      ))
    const dimensions = this.props.detailData.dims.map((row, i) => {
      return (
        <ModalDropdown
          key={`dropdown_${i}`}
          options={row.values}
          renderRow={this.dropdownRenderRow}
          renderHeadText={this.dropdownRenderHeaderText}
          defaultIndex={0}
          defaultValue={row.values[0].title}
        />
      )
    })
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text>{this.props.detailData.MeasureTitle}</Text>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <ModalDropdown
            key={`dropdown_12`}
            options={this.props.detailData.dims[0].values}
            renderRow={this.dropdownRenderRow}
            renderHeadText={this.dropdownRenderHeaderText}
            defaultIndex={0}
            defaultValue={this.props.detailData.dims[0].values[0].title}
          />
          {dimensions}
        </View>
        <View style={styles.squareList}>
          {squares}
        </View>
        <View style={styles.chartView}>
          <View style={styles.chartHeader}>
            {timeConditions}
          </View>
          <ChartView style={styles.chartContent} config={chartConfig} series={this.props.detailSeries} />
        </View>
        <Modal
          style={styles.modal}
          ref="modalGeneral"
          isOpen={this.props.isVisibleCalendar}
          onClosed={this.onClosed}
          entry="top"
        >
          <Calendar
            current={this.props.generalDate}
            selected={[this.props.generalDate]}
            onDayPress={this.onDayPress}
            hideExtraDays
          />
        </Modal>
      </ScrollView>

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
    padding: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  chartView: {
    marginTop: 10,
    padding: 5,
    backgroundColor: 'white',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  chartHeaderItemUnSelected: {
    width: 60,
    height: 20,
    marginLeft: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#dcdcdc',
  },
  chartHeaderItemSelected: {
    width: 60,
    height: 20,
    marginLeft: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#4198ea',
  },
  chartContent: {
    marginTop: 5,
    height: 250,
    backgroundColor: 'white',
  },
})

export default Detail
