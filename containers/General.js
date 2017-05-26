import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'dva'

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Calendar } from 'react-native-calendars'

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
    const tabs = this.props.generalMenu.map((row, i) => (<MeasureList
      tabLabel={row.title}
      key={row.id}
      menuId={row.id}
      fetching={this.props.fetching}
      dispatch={this.props.dispatch}
      data={this.props.measureData.rows}
    />))

    return (
      <ScrollableTabView
        style={styles.container}
        onChangeTab={this.onChangeTab}
        renderTabBar={() => <ScrollableTabBar />}
        locked
      >
        {tabs}
        <ActivityIndicator
          animating={this.props.fetching}
          style={[styles.centering, { height: 80 }]}
          size="large"
        />
      </ScrollableTabView>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
})

export default General
