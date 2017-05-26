import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { connect } from 'dva'

import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modalbox'

import { createAction } from '../utils'

@connect(({ app }) => ({ ...app }))
class Kpi extends Component {

  onDayPress = (id) => {
    console.log(id)
  }
  onClosed = () => {
    this.props.dispatch(createAction('app/closeCalendar')())
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          ref="modal1"
          isOpen={this.props.isVisibleCalendar}
          onClosed={this.onClosed}
        >
          <Calendar
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  },
})

export default Kpi
