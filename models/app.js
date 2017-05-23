import { createAction, NavigationActions } from '../utils'

import * as uuapService from '../services/uuap'
import * as apiService from '../services/api'
import env from '../constants/environment'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    userName: '',
    token: '',
  },
  reducers: {
    setUserName(state, { payload }) {
      return { ...state, userName: payload.login.username }
    },
    setToken(state, { payload }) {
      console.log(payload)
      return { ...state, token: payload.ticket }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const login = yield call(uuapService.login, payload)
      if (login.status) {
        yield put(createAction('setUserName')({ login }))
      }
    },
    *getTicket({ payload }, { call, put }) {
      const { ticket } = yield call(uuapService.getTicket, payload)
      yield put({
        type: 'setToken',
        payload: ticket,
      });
    },
    *forceUpdateToken({ payload }, { call, put }) {
      const login = yield call(uuapService.forceUpdateToken, payload)
    },
    *request({ payload }, { call, put }) {
      try{
        const data = yield call(payload.requestType, payload.params)
        console.log(data)
        return data
      }
      catch (e)
      {
        console.log(e.response)
      }
    },
    *getMenuList({ payload }, { select, call, put }) {
      const { token } = yield call(uuapService.getToken, payload)
      const { app } = yield select(state => state);
      const requestParam = {
        requestType: apiService.getMenuList,
        params: {
          user: app.userName,
          token: token,
          type: payload.requestType,
        }
      }
      yield put({
        type: 'request',
        payload: requestParam,
      });
    },
  },
}
