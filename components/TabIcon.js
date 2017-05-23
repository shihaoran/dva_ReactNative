import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

const imageList = [
    require('../images/favorite.png'),
    require('../images/kpi.png'),
    require('../images/general.png'),
    require('../images/my.png'),
];

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  var icon;
  if (props.title === '收藏' ) {
    icon = imageList[0];
  } else if (props.title === 'KPI' ) {
    icon = imageList[1];
  } else if (props.title === '产品线' ) {
    icon = imageList[2];
  } else if (props.title === '我的' ) {
    icon = imageList[3];
  }
  
  return (
    <View style={{ flex:1, alignItems: 'center' }}>
      <Image source={icon} style={{ width: 25, height: 25, tintColor: props.selected ? '#108ee9' : 'gray' }}/>
      <Text style={{ color: props.selected ? '#108ee9' : 'gray' }}>
        {props.title}
      </Text>
    </View>
  )
};

TabIcon.propTypes = propTypes;

export default TabIcon;