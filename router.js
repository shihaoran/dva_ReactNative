import React, { Component } from 'react'

import { StyleSheet } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import Favorite from './containers/Favorite'
import Kpi from './containers/Kpi'
import General from './containers/General'
import My from './containers/My'

import TabIcon from './components/TabIcon'
import ConnectedNavBar from './components/ConnectedNavBar'

import { router } from './constants/router'

const reducerCreate = params => {
  console.log(params)
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

export default class APP extends Component {
  render() {
    return (<Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar>
          <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle}>
            <Scene key={router.favoriteTabKey} title={router.favoriteTabTitle} icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key={router.favoriteKey}
                component={Favorite}
                navBar={ConnectedNavBar}
                title={router.favoriteTitle}
                rightButtonTextStyle={styles.rightTitleTextStyle}
                rightButtonImage={require('./images/calendar.png')}
                rightButtonIconStyle={styles.rightTitleImageStyle}
              />
            </Scene>
            <Scene key={router.kpiTabKey} initial title={router.kpiTabTitle} icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key={router.kpiKey}
                component={Kpi}
                navBar={ConnectedNavBar}
                title={router.kpiTitle}
                rightButtonTextStyle={styles.rightTitleTextStyle}
                rightButtonImage={require('./images/calendar.png')}
                rightButtonIconStyle={styles.rightTitleImageStyle}
              />
            </Scene>
            <Scene key={router.generalTabKey} title={router.generalTabTitle} icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key={router.generalKey}
                component={General}
                navBar={ConnectedNavBar}
                title={router.generalTitle}
                rightButtonTextStyle={styles.rightTitleTextStyle}
                rightButtonImage={require('./images/calendar.png')}
                rightButtonIconStyle={styles.rightTitleImageStyle}
              />
            </Scene>
            <Scene key={router.myTabKey} title={router.myTabTitle} icon={TabIcon} navigationBarStyle={styles.navigationBarStyle} titleStyle={{ color: 'white' }}>
              <Scene
                key={router.myKey}
                component={My}
                title={router.myTitle}
              />
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

