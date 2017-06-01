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

import { colorTheme } from '../constants/color'
import { env } from '../constants/environment'
import { createAction } from '../utils'


const ListItem = (props) => {
  const b1 = parseFloat(props.data.b1) >= 0
  const b2 = parseFloat(props.data.b2) >= 0

  const onFavorite = () => {
    props.dispatch(createAction('app/updateMeasureFavorite')({
      measureId: props.data.measure_id,
      status: props.menuType === env.menuType.favorite || props.data.isFavorite === '1' ? '2' : '1',
    }))
    if (props.menuType === env.menuType.favorite) {
      const fun = () => {
        props.dispatch(createAction('app/getMeasureFavorites')())
      }
      setTimeout(fun, 500)
    } else {
      props.dispatch(createAction('app/getMeasureList')({
        menuId: props.menuId,
        menuType: props.menuType,
      }))
    }
  }

  const swipeoutBtns = [
    {
      text: props.menuType === env.menuType.favorite || props.data.isFavorite === '1' ? '取消收藏' : '收藏',
      onPress: onFavorite,
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
    backgroundColor: colorTheme.listItemBackground,
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
    color: colorTheme.listItemValue,
    fontWeight: 'bold',
  },
  valuePositive: {
    backgroundColor: colorTheme.listItemPositiveValue,

    height: 20,
    width: 106,
    fontSize: 15,

    marginHorizontal: 4,
  },
  valueNegative: {
    backgroundColor: colorTheme.listItemNegativeValue,

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
