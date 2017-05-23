import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { connect } from 'dva'

import { createAction } from '../utils'

@connect(({ app }) => ({ ...app }))
class My extends Component {

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onGetTicket = () => {
    this.props.dispatch(createAction('app/getTicket')())
  }

  onForceUpdateToken = () => {
    this.props.dispatch(createAction('app/forceUpdateToken')())
  }

  onMenu = () => {
    this.props.dispatch(createAction('app/getMenuList')({requestType:1}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={this.onLogin} />
        <Button title="GetTicket" onPress={this.onGetTicket} />
        <Button title="UpdateTicket" onPress={this.onForceUpdateToken} />
        <Button title="UpdateTicket" onPress={this.onMenu} />
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
})

export default My
