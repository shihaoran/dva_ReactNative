import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'dva'
import { Actions } from 'react-native-router-flux'

import { createAction } from '../utils'
import { colorTheme } from '../constants/color'

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
    this.props.dispatch(createAction('app/getMenuList')({ requestType: 1 }))
    this.props.dispatch(createAction('app/getMenuList')({ requestType: 0 }))
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../images/my.png')} style={styles.headerPortrait} />
          <Text style={styles.headerTitle}>{this.props.userName}</Text>
          <Text style={styles.headerSubTitle}>盖亚随心，数据随行</Text>
        </View>
        <View style={styles.menuContent}>
          <View style={styles.separation} />
          <View style={styles.line} />
          <TouchableOpacity onPress={Actions.MyRecord}>
            <View style={styles.menuItem}>
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity onPress={Actions.MyRecord}>
            <View style={styles.menuItem}>
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.separation} />
          <View style={styles.separation} />
          <View style={styles.line} />
          <TouchableOpacity onPress={Actions.MyRecord}>
            <View style={styles.menuItem}>
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
        <Button title="Login" onPress={this.onLogin} />
        <Button title="GetTicket" onPress={this.onGetTicket} />
        <Button title="UpdateTicket" onPress={this.onForceUpdateToken} />
        <Button title="GetMenu" onPress={this.onMenu} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: Dimensions.get('window').width,
    height: 170,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colorTheme.navBarBackground,
  },
  headerPortrait: {
    width: 60,
    height: 60,
    marginTop: 20,
    tintColor: colorTheme.navBarText,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colorTheme.navBarText,
    marginTop: 10,
  },
  headerSubTitle: {
    fontSize: 15,
    color: colorTheme.navBarText,
    marginTop: 10,
  },
  menuContent: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colorTheme.backgroundColor,
  },
  separation: {
    height: 20,
    width: Dimensions.get('window').width,
  },
  line: {
    height: 0.5,
    width: Dimensions.get('window').width,
    backgroundColor: '#b7b7b7',
  },
  menuItem: {
    height: 40,
    width: Dimensions.get('window').width,
    backgroundColor: colorTheme.listItemBackground,
  },
})

export default My
