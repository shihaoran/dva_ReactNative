import { createAction, NavigationActions } from '../utils'

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
    kpiMenu: [],

    generalDate: '',
    kpiDate: '',

    measureData: new Map(),
  },
  reducers: {
    setUserName(state, { payload }) {
      return { ...state, userName: payload.login.username }
    },
    setToken(state, { payload }) {
      console.log(payload)
      return { ...state, token: payload.ticket }
    },
    setMenu(state, { payload }) {
      if (payload.requestType === 'kpi') {
        return { ...state, kpiMenu: payload.data }
      } else if (payload.requestType === 'general') {
        return { ...state, generalMenu: payload.data }
      }
      return { ...state }
    },
    fetchingStart(state) {
      return { ...state, fetching: true }
    },
    fetchingEnd(state) {
      return { ...state, token: false }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const login = yield call(uuapService.login, payload)
      if (login.status) {
        yield put(createAction('setUserName')({ login }))
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
          requestType: payload.requestType === env.menuType.kpi ? 'kpi' : 'general',
          data: response.Return,
        },
      })
    },

    * getMeasureList({ payload }, { select, call, put }) {
      const { token } = yield call(uuapService.getToken, payload)
      const { app } = yield select(state => state)
      const requestParam = {
        requestType: apiService.getMenuList,
        params: {
          user: app.userName,
          token,
          menuId: payload.menuId,
          date: kpiDate,
          offset: 0,
          type: payload.requestType,
        },
      }
      const { data } = yield call(apiService.netRequest, requestParam)
      console.log(data)
    },
  },
}
