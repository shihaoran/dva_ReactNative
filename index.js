import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import dva from 'dva/mobile'
import { persistStore, autoRehydrate } from 'redux-persist'

import { registerModels } from './models'
import APP from './router'

_app = dva({
  initialState: {},
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    console.log('onError', e)
  },
})
registerModels(_app)
_app.router(() => <APP />)
const App = _app.start()

// eslint-disable-next-line no-underscore-dangle
persistStore(_app._store, { storage: AsyncStorage })

AppRegistry.registerComponent('DvaStarter', () => App)
