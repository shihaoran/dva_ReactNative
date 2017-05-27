import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Animated,
  PixelRatio,
  Dimensions,
  AsyncStorage,
  Button,
} from 'react-native'
import { connect } from 'dva'


import Orientation from 'react-native-orientation'

import { createAction } from '../utils'

@connect(({ app }) => ({ ...app }))
class Launch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0), // init opacity 0
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim, {
        toValue: 1,
        duration: 1500,
      },           // Configuration
    ).start(this.onLogin)                // Don't forget start!
    Orientation.lockToPortrait()
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer)
  }

  onLogin = () => {
    AsyncStorage.getItem('ifLogin', (error, result) => {
      if (error) {
        console.log(error)
        return
      }
      if (result === 'true') {
        this.props.dispatch(createAction('app/getInitData')())
      } else {
        this.props.dispatch(createAction('app/login')())
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../images/launch.jpg')} style={[styles.img, { opacity: this.state.fadeAnim }]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  img: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: PixelRatio.get() * 80,
    borderColor: '#ffffff',
  },
})

export default Launch
