import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'dva'

import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modalbox'

import FavoriteList from '../components/FavoriteList'

import { createAction, padNumber } from '../utils'

import { env } from '../constants/environment'

@connect(({ app }) => ({ ...app }))
class Favorite extends Component {
  onClosed = () => {
    this.props.dispatch(createAction('app/closeCalendar')())
  }

  onDayPress = (data) => {
    const date = `${padNumber(data.year, 4)}-${padNumber(data.month, 2)}-${padNumber(data.day, 2)}`
    console.log(date)
    this.props.dispatch(createAction('app/setDate')(
      {
        requestType: env.menuType.favorite,
        data: date,
      },
    ))
    this.props.dispatch(createAction('app/getMeasureFavorites')())
    this.onClosed()
  }

  _renderList = () => {
    if (this.props.favoriteData.total === 0) {
      return (<Text>控控乳液</Text>)
    }
    return (<FavoriteList
      fetching={this.props.fetching}
      dispatch={this.props.dispatch}
      data={this.props.favoriteData.rows}
    />)
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        {this._renderList()}
        <Modal
          style={styles.modal}
          ref="modalGeneral"
          isOpen={this.props.isVisibleCalendar}
          onClosed={this.onClosed}
          entry="top"
        >
          <Calendar
            current={this.props.favoriteDate}
            selected={[this.props.favoriteDate]}
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

export default Favorite
