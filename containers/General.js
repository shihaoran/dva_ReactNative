import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'dva'

import MeasureList from '../components/MeasureList'

@connect(({ app }) => ({ ...app }))
class General extends Component {


  getData = (id) => {
    console.log(this.props.measureData)
  }

  render() {
    const tabs = this.props.generalMenu.map((row, i) => {
      console.log(row)
      return (<MeasureList
        tabLabel={row.title}
        menuId={row.id}
        fetching={this.props.fetching}
        dispatch={this.props.dispatch}
        data={this.getData(row.id)}
      />)
    })

    return (
      <View>
        {tabs}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default General
