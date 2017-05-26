import React, {
  PropTypes,
} from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native'
import {router} from '../constants/router'
const imageList = [
  require('../images/favorite.png'),
  require('../images/kpi.png'),
  require('../images/general.png'),
  require('../images/my.png'),
]

const propTypes = {
  selected: PropTypes.bool,
  sceneKey: PropTypes.string,
}

const TabIcon = (props) => {
  let icon
  if (props.sceneKey === router.favoriteTabKey) {
    icon = imageList[0]
  } else if (props.sceneKey === router.kpiTabKey) {
    icon = imageList[1]
  } else if (props.sceneKey === router.generalTabKey) {
    icon = imageList[2]
  } else if (props.sceneKey === router.myTabKey) {
    icon = imageList[3]
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image source={icon} style={{ width: 25, height: 25, tintColor: props.selected ? '#108ee9' : 'gray' }} />
      <Text style={{ color: props.selected ? '#108ee9' : 'gray' }}>
        {props.title}
      </Text>
    </View>
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
