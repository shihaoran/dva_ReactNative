import React, { Component } from 'react'

import { AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import Favorite from './containers/Favorite'
import Kpi from './containers/Kpi'
import General from './containers/General'
import My from './containers/My'

import TabIcon from './components/TabIcon'

const reducerCreate = params => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
    paddingBottom: 15,
    paddingTop: 20,
    borderColor: '#108ee9',
  },
})

export default class APP extends Component {
  render() {
    return (<Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar>
          <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle}>
            <Scene key="tab1" title="收藏" icon={TabIcon} navigationBarStyle={{ backgroundColor: 'red' }} titleStyle={{ color: 'white' }}>
              <Scene key="tab1_1" component={Favorite} title="Tab #1_1" onRight={() => alert('Right button')} rightTitle="Right" />
            </Scene>
            <Scene key="tab2" initial title="KPI" icon={TabIcon}>
              <Scene key="tab2_1" component={Kpi} title="KPI报表" onLeft={() => alert('Left button!')} leftTitle="Left" />
            </Scene>
            <Scene key="tab3" initial title="产品线" icon={TabIcon}>
              <Scene key="tab3_1" component={General} title="产品线报表" onLeft={() => alert('Left button!')} leftTitle="Left" />
            </Scene>
            <Scene key="tab4" initial title="我的" icon={TabIcon}>
              <Scene key="tab4_1" component={My} title="Tab #2_1" onLeft={() => alert('Left button!')} leftTitle="Left" />
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>)
  }
}
