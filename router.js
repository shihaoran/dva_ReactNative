import React, { Component } from 'react'

import { StyleSheet } from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import Launch from './containers/Launch'
import Favorite from './containers/Favorite'
import Kpi from './containers/Kpi'
import General from './containers/General'
import My from './containers/My'
import Feedback from './containers/Feedback'
import Detail from './containers/Detail'

import TabIcon from './components/TabIcon'
import ConnectedNavBar from './components/ConnectedNavBar'

import { router } from './constants/router'
import { env } from './constants/environment'
import { colorTheme } from './constants/color'
import { createAction } from './utils'

const reducerCreate = params => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log('ACTION:', action)
    if (action.key === router.favoriteTabKey) {
      _app._store.dispatch(createAction('app/getMeasureFavorites')())
    } else if (action.key === router.kpiTabKey) {
      _app._store.dispatch(createAction('app/getMeasureList')({
        menuType: env.menuType.kpi,
      }))
    } else if (action.key === router.generalTabKey) {
      _app._store.dispatch(createAction('app/getMeasureList')({
        menuType: env.menuType.general,
      }))
    }
    return defaultReducer(state, action)
  }
}

export default class APP extends Component {
  render() {
    return (<Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: colorTheme.backgroundColor }}>
      <Scene key="root" hideNavBar>
        <Scene key="launch" initial component={Launch} hideNavBar />
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
              hideNavBar
              initial
              key={router.myKey}
              component={My}
              title={router.myTitle}
            />
            <Scene
              hideNavBar={false}
              key={router.feedbackKey}
              component={Feedback}
              navBar={ConnectedNavBar}
              title={router.feedbackTitle}
              rightButtonTextStyle={styles.rightTitleTextStyle}
            />
            <Scene
              hideNavBar={false}
              key="detail"
              component={Detail}
              title={router.feedbackTitle}
              rightButtonTextStyle={styles.rightTitleTextStyle}
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>)
  }
}


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colorTheme.tabBarBackground,
    borderTopWidth: 0.5,
    borderColor: colorTheme.tabBarBorder,
    paddingBottom: 15,
    paddingTop: 20,
  },
  navigationBarStyle: {
    backgroundColor: colorTheme.navBarBackground,
    borderBottomWidth: 0,
  },
  rightTitleTextStyle: {
    color: colorTheme.navBarText,
    fontSize: 14,
  },
  rightTitleImageStyle: {
    tintColor: colorTheme.navBarText,
    marginRight: 79,
    marginBottom: 18,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

