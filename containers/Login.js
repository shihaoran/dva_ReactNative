import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native'
import { connect } from 'dva'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onGetTicket = () => {
    this.props.dispatch(createAction('app/getTicket')())
  }

  onForceUpdateToken = () => {
    this.props.dispatch(createAction('app/forceUpdateToken')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { fetching, userName } = this.props
    return (
      <View style={styles.container}>
        <Text>{userName}</Text>
        {fetching
          ? <ActivityIndicator />
          : <Button title="Login" onPress={this.onLogin} />}
        {fetching
          ? <ActivityIndicator />
          : <Button title="GetTicket" onPress={this.onGetTicket} />}
        {fetching
          ? <ActivityIndicator />
          : <Button title="UpdateTicket" onPress={this.onForceUpdateToken} />}
        {!fetching && <Button title="Close" onPress={this.onClose} />}
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
})

export default Login
