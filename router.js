import React, { Component } from 'react'

import { AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import { connect } from 'dva'

import Favorite from './containers/Favorite'
import Kpi from './containers/Kpi'
import General from './containers/General'
import My from './containers/My'

import TabIcon from './components/TabIcon'

import { createAction } from './utils'

const reducerCreate = params => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

@connect(({ app }) => ({ ...app }))
export default class APP extends Component {


  onRight = () => {
    this.props.dispatch(createAction('app/showCalendar')())
  }


  render() {
    return (<Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar>
          <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle}>
            <Scene key="tab1" title="收藏" icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene key="tab1_1" component={Favorite} title="收藏" onRight={() => alert('Right button')} rightTitle="Right" />
            </Scene>
            <Scene key="tab2" initial title="KPI" icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key="tab2_1"
                component={Kpi}
                title="KPI报表"
                onRight={this.onRight}
                rightTitle={this.props.kpiDate}
                rightButtonTextStyle={styles.rightTitleTextStyle}
                rightButtonImage={require('./images/calendar.png')}
                rightButtonIconStyle={styles.rightTitleImageStyle}
              />
            </Scene>
            <Scene key="tab3" initial title="产品线" icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key="tab3_1"
                component={General}
                title="产品线报表"
                onRight={() => alert('Left button!')}
                rightTitle={this.props.generalDate}
                rightButtonTextStyle={styles.rightTitleTextStyle}
                rightButtonImage={require('./images/calendar.png')}
                rightButtonIconStyle={styles.rightTitleImageStyle}
              />
            </Scene>
            <Scene key="tab4" initial title="我的" icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene key="tab4_1" component={My} title="我的" onLeft={() => alert('Left button!')} leftTitle="Left" />
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>)
  }
}


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    paddingBottom: 15,
    paddingTop: 20,
  },
  navigationBarStyle: {
    backgroundColor: '#108ee9',
    borderBottomWidth: 0,
  },
  rightTitleTextStyle: {
    color: '#fff',
    fontSize: 14,
  },
  rightTitleImageStyle: {
    tintColor: '#fff',
    marginRight: 79,
    marginBottom: 18,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

