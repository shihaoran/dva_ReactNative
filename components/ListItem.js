/**
 * Created by shi on 2017/5/23.
 */
import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'


const ListItem = (props) => {
  const b1 = parseInt(props.data.b1) >= 0
  const b2 = parseInt(props.data.b2) >= 0

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.data.title}</Text>
      <View style={styles.content}>
        <Text style={styles.value}>{`${props.data.value} ${props.data.unit}`}</Text>
        <Text style={b1 ? styles.valuePositive : styles.valueNegative} >{`${props.data.b1Name}:${props.data.b1}%`}</Text>
        <Text style={b2 ? styles.valuePositive : styles.valueNegative} >{`${props.data.b2Name}:${props.data.b2}%`}</Text>
      </View>
    </View>
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
    height: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 30,
    color: '#404040',
  },
  content: {
    flexDirection: 'row',
    height: 30,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  value: {
    height: 30,
    fontSize: 30,
    color: '#108ee9',
  },
  valuePositive: {
    backgroundColor: '#00a854',

    height: 20,
    width: 40,
    fontSize: 15,
  },
  valueNegative: {
    backgroundColor: '#f04134',

    height: 20,
    width: 40,
    fontSize: 15,
  },
})

export default ListItem
