import { Actions } from 'react-native-router-flux'
import Toast from 'react-native-root-toast'
import { AsyncStorage } from 'react-native'
import { createAction } from '../utils'

import * as uuapService from '../services/uuap'
import * as apiService from '../services/api'
import { env } from '../constants/environment'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    userName: '',
    token: '',

    generalMenu: [],
    generalActiveMenu: '',
    kpiMenu: [],
    kpiActiveMenu: '',

    favoriteDate: '2017-05-21',
    generalDate: '2017-05-21',
    kpiDate: '2017-05-20',
    isVisibleCalendar: false,

    measureData: [],
  },
  reducers: {
    setUserName(state, { payload }) {
      return { ...state, userName: payload.login.username, login: true }
    },
    setToken(state, { payload }) {
      console.log(payload)
      return { ...state, token: payload.ticket }
    },
    setMenu(state, { payload }) {
      console.log(payload)
      if (payload.requestType === env.menuType.kpi) {
        return { ...state, kpiMenu: payload.data, kpiActiveMenu: payload.data[0].id }
      } else if (payload.requestType === env.menuType.general) {
        return { ...state, generalMenu: payload.data, generalActiveMenu: payload.data[0].id }
      }
      return { ...state }
    },
    setMeasureData(state, { payload }) {
      return { ...state, measureData: payload.data }
    },
    fetchingStart(state) {
      return { ...state, fetching: true }
    },
    fetchingEnd(state) {
      return { ...state, fetching: false }
    },
    showCalendar(state) {
      return { ...state, isVisibleCalendar: true }
    },
    closeCalendar(state) {
      return { ...state, isVisibleCalendar: false }
    },
    setDate(state, { payload }) {
      if (payload.requestType === env.menuType.kpi) {
        return { ...state, kpiDate: payload.data }
      } else if (payload.requestType === env.menuType.general) {
        return { ...state, generalDate: payload.data }
      }
      return { ...state }
    },
    setActiveMenu(state, { payload }) {
      if (payload.requestType === env.menuType.kpi) {
        return { ...state, kpiActiveMenu: payload.data }
      } else if (payload.requestType === env.menuType.general) {
        return { ...state, generalActiveMenu: payload.data }
      }
      return { ...state }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const login = yield call(uuapService.login, payload)
      if (login.status) {
        yield call(AsyncStorage.setItem, 'ifLogin', 'true')
        yield put(createAction('setUserName')({ login }))
        yield put(createAction('getInitData')())
      }
    },
    * getTicket({ payload }, { call, put }) {
      const { ticket } = yield call(uuapService.getTicket, payload)
      yield put({
        type: 'setToken',
        payload: ticket,
      })
    },
    * forceUpdateToken({ payload }, { call, put }) {
      const login = yield call(uuapService.forceUpdateToken, payload)
    },
    * getMenuList({ payload }, { select, call, put }) {
      const { token } = yield call(uuapService.getToken, payload)
      const { app } = yield select(state => state)
      const requestParam = {
        requestType: apiService.getMenuList,
        params: {
          user: app.userName,
          token,
          type: payload.requestType,
        },
      }
      const response = yield call(apiService.netRequest, { ...requestParam })
      yield put({
        type: 'setMenu',
        payload: {
          requestType: payload.requestType,
          data: response.Return,
        },
      })
      yield put({
        type: 'getMeasureList',
        payload: {
          menuId: response.Return[0].id,
          menuType: 1,
        },
      })
    },

    * getMeasureList({ payload }, { select, call, put }) {
      yield put({ type: 'fetchingStart' })
      const { token } = yield call(uuapService.getToken, payload)
      const { app } = yield select(state => state)
      const requestParam = {
        requestType: apiService.getMeasureList,
        params: {
          user: app.userName,
          token,
          menuId: payload.menuId,
          date: payload.menuType === env.menuType.kpi ? app.kpiDate : app.generalDate,
          offset: 0,
        },
      }
      const response = yield call(apiService.netRequest, { ...requestParam })
      yield put({
        type: 'setMeasureData',
        payload: {
          data: response.Return,
        },
      })
      yield put({ type: 'fetchingEnd' })
    },
    * getInitData({ payload }, { select, call, put }) {
      try {
        yield put({
          type: 'getMenuList',
          payload: {
            requestType: env.menuType.kpi,
          },
        })
        yield put({
          type: 'getMenuList',
          payload: {
            requestType: env.menuType.general,
          },
        })
        Actions.tabbar({ type: 'reset' })
      } catch (error) {
        Toast.show('This is a message', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }
    },
  },
}
