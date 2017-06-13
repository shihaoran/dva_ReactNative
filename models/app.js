import { Actions } from 'react-native-router-flux'
import Toast from 'react-native-root-toast'
import { AsyncStorage } from 'react-native'
import { createAction } from '../utils'

import * as uuapService from '../services/uuap'
import * as apiService from '../services/api'
import { env } from '../constants/environment'
import { router } from '../constants/router'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    userName: '',
    token: '',

    generalMenu: [
      {
        desc: '',
        id: 539,
        title: '手百',
      },
      {
        desc: '',
        id: 538,
        title: 'Feed',
      },
      {
        desc: '',
        id: 540,
        title: '视频',
      },
      {
        desc: '',
        id: 541,
        title: '大搜整体',
      },
      {
        desc: '',
        id: 534,
        title: '推荐产品',
      },
      {
        desc: '',
        id: 537,
        title: '百家号',
      },
    ],
    generalActiveMenu: '',
    kpiMenu: [
      {
        desc: '',
        id: 533,
        title: '手百',
      },
      {
        desc: '',
        id: 531,
        title: 'Feed',
      },
      {
        desc: '',
        id: 532,
        title: '视频',
      },
      {
        desc: '',
        id: 535,
        title: '搜索',
      },
    ],
    kpiActiveMenu: '',
    activeMenu: '',

    favoriteDate: '2017-05-21',
    generalDate: '2017-05-21',
    kpiDate: '2017-05-20',
    isVisibleCalendar: false,

    measureData: {
      rows: [
        {
          b1: '-8.16',
          b1Name: '周同比',
          b2: '-6.73',
          b2Name: '日环比',
          isFavorite: '1',
          measure_id: 30,
          reverse: 1,
          sub_title: '',
          title: '单次启动崩溃率/手百',
          unit: '%',
          value: '0.07',
        },
      ],
      total: 1,
    },
    favoriteData: {
      rows: [
        {
          b1: '-8.16',
          b1Name: '周同比',
          b2: '-6.73',
          b2Name: '日环比',
          isFavorite: '1',
          measure_id: 30,
          reverse: 1,
          sub_title: '',
          title: '单次启动崩溃率/手百',
          unit: '%',
          value: '0.07',
        },
      ],
      total: 1,
    },
    feedback: '',
  },
  reducers: {
    setUserName(state, { payload }) {
      return { ...state, userName: payload.login.username, login: true }
    },
    clearUserName(state) {
      return { ...state, userName: '', login: false }
    },
    setToken(state, { payload }) {
      console.log(payload)
      return { ...state, token: payload.ticket }
    },
    setMenu(state, { payload }) {
      console.log(payload)
      if (payload.requestType === env.menuType.kpi) {
        return { ...state, kpiMenu: payload.data, kpiActiveMenu: payload.data[0].id, activeMenu: payload.data[0].id }
      } else if (payload.requestType === env.menuType.general) {
        return { ...state, generalMenu: payload.data, generalActiveMenu: payload.data[0].id, activeMenu: payload.data[0].id }
      }
      return { ...state }
    },
    setMeasureData(state, { payload }) {
      return { ...state, measureData: payload.data }
    },
    setFavoriteData(state, { payload }) {
      return { ...state, favoriteData: payload.data }
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
      } else if (payload.requestType === env.menuType.favorite) {
        return { ...state, favoriteDate: payload.data }
      }
      return { ...state }
    },
    setActiveMenu(state, { payload }) {
      if (payload.requestType === env.menuType.kpi) {
        return { ...state, kpiActiveMenu: payload.data, activeMenu: payload.data }
      } else if (payload.requestType === env.menuType.general) {
        return { ...state, generalActiveMenu: payload.data, activeMenu: payload.data }
      }
      return { ...state }
    },
    setFeedback(state, { payload }) {
      return { ...state, feedback: payload.data }
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
    * logout({ payload }, { call, put }) {
      yield call(AsyncStorage.setItem, 'ifLogin', 'false')
      yield put(createAction('clearUserName')())
      Actions.launch({ type: 'reset' })
      yield call(uuapService.logout, payload)
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
    },

    * getMeasureList({ payload }, { select, call, put }) {
      yield put({ type: 'fetchingStart' })
      const { token } = yield call(uuapService.getToken, payload)
      const { app } = yield select(state => state)
      // 如果请求参数中不含menu类型，则从activeMenu中取
      const menuType = 'menuType' in payload ? payload.menuType : app.activeMenu === app.kpiActiveMenu ? env.menuType.kpi : env.menuType.general
      // 默认menuId
      const menuId = 'menuId' in payload ? payload.menuId : menuType === env.menuType.kpi ? app.kpiActiveMenu : app.generalActiveMenu
      const requestParam = {
        requestType: apiService.getMeasureList,
        params: {
          user: app.userName,
          token,
          menuId,
          date: menuType === env.menuType.kpi ? app.kpiDate : app.generalDate,
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
            requestType: env.menuType.general,
          },
        })
        yield put({
          type: 'getMenuList',
          payload: {
            requestType: env.menuType.kpi,
          },
        })
        yield put({ type: 'getMeasureFavorites' })
        Actions.tabbar({ type: 'reset' })
        Actions.tab2()
      } catch (error) {
        console.log(error)
        Toast.show('网络错误', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }
    },
    * updateFeedback({ payload }, { select, call, put }) {
      yield put({ type: 'fetchingStart' })
      try {
        const { token } = yield call(uuapService.getToken, payload)
        const { app } = yield select(state => state)
        const requestParam = {
          requestType: apiService.updateUserFeedback,
          params: {
            user: app.userName,
            token,
            content: app.feedback,
          },
        }
        yield call(apiService.netRequest, { ...requestParam })
        yield put({ type: 'fetchingEnd' })
        yield put({
          type: 'setFeedback',
          payload: {
            data: '',
          },
        })
        Actions[router.myKey]({ type: 'reset' })
        Toast.show('提交成功，感谢您的反馈', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      } catch (e) {
        console.log(e)
        Toast.show('网络错误', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }
    },
    * updateMeasureFavorite({ payload }, { select, call, put }) {
      yield put({ type: 'fetchingStart' })
      try {
        const { token } = yield call(uuapService.getToken, payload)
        const { app } = yield select(state => state)
        const requestParam = {
          requestType: apiService.updateMeasureFavorite,
          params: {
            user: app.userName,
            token,
            measureId: payload.measureId,
            status: payload.status,
          },
        }
        yield call(apiService.netRequest, { ...requestParam })
        yield put({ type: 'fetchingEnd' })
        Toast.show(payload.status === '1' ? '收藏成功' : '取消成功', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      } catch (e) {
        console.log(e)
        Toast.show('网络错误', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }
    },
    * getMeasureFavorites({ payload }, { select, call, put }) {
      yield put({ type: 'fetchingStart' })
      try {
        const { token } = yield call(uuapService.getToken, payload)
        const { app } = yield select(state => state)
        const requestParam = {
          requestType: apiService.getMeasureFavorites,
          params: {
            user: app.userName,
            token,
            date: app.favoriteDate,
            offset: 0,
          },
        }
        const response = yield call(apiService.netRequest, { ...requestParam })
        console.log(response.Return)
        yield put({
          type: 'setFavoriteData',
          payload: {
            data: response.Return,
          },
        })
        yield put({ type: 'fetchingEnd' })
      } catch (e) {
        console.log(e)
        Toast.show('网络错误', {
          duration: Toast.durations.SHORT,
          position: env.toastPosition,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }
    },
  },
}
