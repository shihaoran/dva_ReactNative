/**
 * Created by shi on 2017/5/23.
 */
import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import Swipeout from 'react-native-swipeout'


const ListItem = (props) => {
  const b1 = parseFloat(props.data.b1) >= 0
  const b2 = parseFloat(props.data.b2) >= 0

  const swipeoutBtns = [
    {
      text: '收藏',
    },
  ]

  return (
    <Swipeout
      right={swipeoutBtns}
      autoClose
    >
      <View style={styles.container}>
        <Text style={styles.header}>{props.data.title}</Text>
        <View style={styles.content}>
          <Text style={styles.value}>{`${props.data.value} ${props.data.unit}`}</Text>
          <View style={styles.percentageBlock}>
            <Text style={b1 ? styles.valuePositive : styles.valueNegative} >{`${props.data.b1Name}:${props.data.b1}%`}</Text>
            <Text style={b2 ? styles.valuePositive : styles.valueNegative} >{`${props.data.b2Name}:${props.data.b2}%`}</Text>
          </View>
        </View>
      </View>
    </Swipeout>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    height: 22,
    position: 'absolute',
    left: 5,
    top: 5,
    fontSize: 18,
    color: '#404040',
  },
  content: {
    flexDirection: 'row',
    height: 30,
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: 0,
  },
  value: {
    height: 30,
    fontSize: 20,
    color: '#108ee9',
    fontWeight: 'bold',
  },
  valuePositive: {
    backgroundColor: '#76d0a3',

    height: 20,
    width: 106,
    fontSize: 15,

    marginHorizontal: 4,
  },
  valueNegative: {
    backgroundColor: '#f46e65',

    height: 20,
    width: 106,
    fontSize: 15,

    marginHorizontal: 4,
  },
  percentageBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
    width: 250,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
})

export default ListItem
