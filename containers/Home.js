import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { connect } from 'dva'

@connect()
class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button title="Goto Detail"/>
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

export default Home
