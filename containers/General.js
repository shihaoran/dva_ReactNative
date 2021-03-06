import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'dva'

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modalbox'

import MeasureList from '../components/MeasureList'

import { createAction, padNumber } from '../utils'

import { env } from '../constants/environment'

@connect(({ app }) => ({ ...app }))
class General extends Component {
  onChangeTab = ({ i, ref }) => {
    this.props.dispatch(createAction('app/getMeasureList')({
      menuType: env.menuType.general,
      menuId: ref.props.menuId,
    }))
    this.props.dispatch(createAction('app/setActiveMenu')({
      requestType: env.menuType.general,
      data: ref.props.menuId,
    }))
  }

  onClosed = () => {
    this.props.dispatch(createAction('app/closeCalendar')())
  }

  onDayPress = (data) => {
    const date = `${padNumber(data.year,4)}-${padNumber(data.month,2)}-${padNumber(data.day,2)}`
    console.log(date)
    this.props.dispatch(createAction('app/setDate')(
      {
        requestType: env.menuType.general,
        data: date,
      },
    ))
    this.props.dispatch(createAction('app/getMeasureList')({
      menuType: env.menuType.general,
      menuId: this.props.generalActiveMenu,
    }))
    this.onClosed()
  }

  render() {
    const tabs = this.props.generalMenu.map((row, i) => (<MeasureList
      tabLabel={row.title}
      key={row.id}
      menuId={row.id}
      menuType={env.menuType.general}
      fetching={this.props.fetching}
      dispatch={this.props.dispatch}
      data={this.props.measureData.rows}
    />))

    return (
      <View
        style={styles.container}
      >
        <ScrollableTabView
          style={styles.tabView}
          onChangeTab={this.onChangeTab}
          ref={(tabView) => { this.tabView = tabView }}
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
  tabView: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
})

export default General
