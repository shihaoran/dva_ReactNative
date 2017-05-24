import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'dva'

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import MeasureList from '../components/MeasureList'

import { createAction } from '../utils'

import { env } from '../constants/environment'

@connect(({ app }) => ({ ...app }))
class General extends Component {


  getData = (id) => {
    console.log(this.props.measureData)
  }

  onChangeTab = ({ i, ref }) => {
    this.props.dispatch(createAction('app/getMeasureList')({
      menuType: env.menuType.general,
      menuId: ref.props.menuId,
    }))
  }

  render() {
    const tabs = this.props.generalMenu.map((row, i) => {
      return (<MeasureList
        tabLabel={row.title}
        key={row.id}
        menuId={row.id}
        fetching={this.props.fetching}
        dispatch={this.props.dispatch}
        data={this.props.measureData.rows}
      />)
    })

    return (
      <ScrollableTabView
        style={styles.container}
        onChangeTab={this.onChangeTab}
        renderTabBar={() => <ScrollableTabBar />}
        locked
      >
        {tabs}
      </ScrollableTabView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
  },
})

export default General
