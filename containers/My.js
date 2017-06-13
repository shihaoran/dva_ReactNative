import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { connect } from 'dva'
import { Actions } from 'react-native-router-flux'

import { createAction } from '../utils'
import { colorTheme } from '../constants/color'
import { router } from '../constants/router'

@connect(({ app }) => ({ ...app }))
class My extends Component {

  onLogin = () => {
    Actions.detail()
    //this.props.dispatch(createAction('app/login')())
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

  onLogout = () => {
    Alert.alert(
      '系统提示',
      '您确定要退出登录么',
      [
        { text: '确定', onPress: () => this.props.dispatch(createAction('app/logout')()) },
        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false },
    )
  }

  renderListItem = (onPress, text) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>{text}</Text>
        <Image source={require('../images/right.png')} style={styles.menuItemIcon} />
      </View>
    </TouchableOpacity>
    )

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
          {this.renderListItem(Actions[router.feedbackKey], '版本更新')}
          <View style={styles.line} />
          {this.renderListItem(Actions[router.feedbackKey], '反馈意见')}
          <View style={styles.line} />
          <View style={styles.separation} />
          <View style={styles.separation} />
          <View style={styles.line} />
          {this.renderListItem(this.onLogout, '退出登录')}
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
    backgroundColor: colorTheme.tabBarBorder,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('window').width,
    backgroundColor: colorTheme.listItemBackground,
  },
  menuItemText: {
    fontSize: 18,
    color: '#404040',
    position: 'absolute',
    left: 20,
  },
  menuItemIcon: {
    position: 'absolute',
    right: 10,
    height: 25,
    width: 25,
    tintColor: colorTheme.tabBarBorder,
  },
})

export default My
