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
    detailData: { dims: [{ values: [{ id: 1, title: '\u6574\u4f53\u5206\u53d1\u91cf(\u4e0d\u542b\u56fe\u96c6\u6ed1\u52a8)' }, { id: 9, title: '\u6574\u4f53\u5206\u53d1\u91cf(\u542b\u56fe\u96c6\u6ed1\u52a8)' }, { id: 2, title: '\u5217\u8868\u9875\u5206\u53d1\u91cf' }, { id: 3, title: '\u5185\u5bb9\u9875\u5206\u53d1\u91cf' }, { id: 4, title: '\u805a\u5408\u9875\u5206\u53d1\u91cf' }, { id: 31, title: '\u56fe\u96c6\u5206\u53d1\u91cf' }, { id: 32, title: 'tab\u5206\u53d1\u91cf' }, { id: 33, title: '\u89c6\u9891\u9891\u9053\u5206\u53d1\u91cf' }], default: '1' }], square: [{ title: '\u9996\u9875\u7cfb', main: '13.28', b1: '-2.78', b2: '1.36', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: '\u624b\u767e', main: '10.10', b1: '-2.40', b2: '1.37', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: '\u624b\u6d4f', main: '0.18', b1: '-5.51', b2: '1.44', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }, { title: 'Wise\u9996\u9875', main: '3.00', b1: '-3.85', b2: '1.35', unit: '\u4ebf', b1Name: '\u5468\u540c\u6bd4', b2Name: '\u65e5\u73af\u6bd4' }], MeasureTitle: 'Feed\u5206\u53d1\u91cf' },
    detailSeries: [{ name: '\u624b\u767e', data: [{ x: 1494432000000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '', 周同比: '' } }, { x: 1494518400000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '16.64', 周同比: '' } }, { x: 1494604800000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '3.95', 周同比: '' } }, { x: 1494691200000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '5.31', 周同比: '' } }, { x: 1494777600000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-3.53', 周同比: '' } }, { x: 1494864000000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-7.11', 周同比: '' } }, { x: 1494950400000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-2.25', 周同比: '' } }, { x: 1495036800000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-0.26', 周同比: '11.57' } }, { x: 1495123200000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-0.10', 周同比: '-4.44' } }, { x: 1495209600000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '8.92', 周同比: '0.13' } }, { x: 1495296000000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '4.45', 周同比: '-0.69' } }, { x: 1495382400000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-3.53', 周同比: '-0.70' } }, { x: 1495468800000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-1.54', 周同比: '5.25' } }, { x: 1495555200000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-5.22', 周同比: '2.06' } }, { x: 1495641600000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '1.51', 周同比: '3.87' } }, { x: 1495728000000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-3.25', 周同比: '0.59' } }, { x: 1495814400000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '0.94', 周同比: '-6.78' } }, { x: 1495900800000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '8.76', 周同比: '-2.94' } }, { x: 1495987200000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '2.34', 周同比: '2.98' } }, { x: 1496073600000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '5.13', 周同比: '9.96' } }, { x: 1496160000000, y: 0.11, value_arr: { value1: '0.11\u4ebf', 日环比: '-9.17', 周同比: '5.37' } }, { x: 1496246400000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '4.68', 周同比: '8.66' } }, { x: 1496332800000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '3.93', 周同比: '16.72' } }, { x: 1496419200000, y: 0.13, value_arr: { value1: '0.13\u4ebf', 日环比: '4.19', 周同比: '20.49' } }, { x: 1496505600000, y: 0.14, value_arr: { value1: '0.14\u4ebf', 日环比: '7.66', 周同比: '19.27' } }, { x: 1496592000000, y: 0.13, value_arr: { value1: '0.13\u4ebf', 日环比: '-3.13', 周同比: '12.89' } }, { x: 1496678400000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '-6.22', 周同比: '0.69' } }, { x: 1496764800000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '-4.01', 周同比: '6.42' } }, { x: 1496851200000, y: 0.13, value_arr: { value1: '0.13\u4ebf', 日环比: '6.30', 周同比: '8.07' } }, { x: 1496937600000, y: 0.12, value_arr: { value1: '0.12\u4ebf', 日环比: '-1.67', 周同比: '2.25' } }, { x: 1497024000000, y: 0.13, value_arr: { value1: '0.13\u4ebf', 日环比: '6.33', 周同比: '4.35' } }, { x: 1497110400000, y: 0.13, value_arr: { value1: '0.13\u4ebf', 日环比: '-4.34', 周同比: '-7.28' } }] }, { name: '\u624b\u6d4f', data: [{ x: 1494432000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '', 周同比: '' } }, { x: 1494518400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '15.38', 周同比: '' } }, { x: 1494604800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '20.68', 周同比: '' } }, { x: 1494691200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '0.78', 周同比: '' } }, { x: 1494777600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-17.85', 周同比: '' } }, { x: 1494864000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-3.28', 周同比: '' } }, { x: 1494950400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '3.87', 周同比: '' } }, { x: 1495036800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-1.26', 周同比: '14.34' } }, { x: 1495123200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-4.22', 周同比: '-5.08' } }, { x: 1495209600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '11.47', 周同比: '-12.33' } }, { x: 1495296000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '2.30', 周同比: '-11.00' } }, { x: 1495382400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-10.59', 周同比: '-3.14' } }, { x: 1495468800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-0.42', 周同比: '-0.28' } }, { x: 1495555200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-11.27', 周同比: '-14.81' } }, { x: 1495641600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '6.62', 周同比: '-8.01' } }, { x: 1495728000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-2.18', 周同比: '-6.05' } }, { x: 1495814400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '7.30', 周同比: '-9.56' } }, { x: 1495900800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '19.83', 周同比: '5.94' } }, { x: 1495987200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '4.55', 周同比: '23.89' } }, { x: 1496073600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '2.98', 周同比: '28.12' } }, { x: 1496160000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-16.36', 周同比: '20.77' } }, { x: 1496246400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '3.18', 周同比: '16.87' } }, { x: 1496332800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '1.84', 周同比: '21.68' } }, { x: 1496419200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '12.98', 周同比: '28.11' } }, { x: 1496505600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '4.13', 周同比: '11.32' } }, { x: 1496592000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-11.51', 周同比: '-5.78' } }, { x: 1496678400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-1.76', 周同比: '-10.11' } }, { x: 1496764800000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '0.82', 周同比: '8.36' } }, { x: 1496851200000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '5.45', 周同比: '10.74' } }, { x: 1496937600000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-3.82', 周同比: '4.59' } }, { x: 1497024000000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '10.28', 周同比: '2.09' } }, { x: 1497110400000, y: 0, value_arr: { value1: '0.00\u4ebf', 日环比: '-0.97', 周同比: '-2.90' } }] }, { name: 'Wise\u9996\u9875', data: [{ x: 1494432000000, y: 0.05, value_arr: { value1: '0.05\u4ebf', 日环比: '', 周同比: '' } }, { x: 1494518400000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '32.37', 周同比: '' } }, { x: 1494604800000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '9.88', 周同比: '' } }, { x: 1494691200000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '2.39', 周同比: '' } }, { x: 1494777600000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '-6.15', 周同比: '' } }, { x: 1494864000000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-7.08', 周同比: '' } }, { x: 1494950400000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-0.90', 周同比: '' } }, { x: 1495036800000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '2.39', 周同比: '31.78' } }, { x: 1495123200000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-1.87', 周同比: '-2.31' } }, { x: 1495209600000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '9.50', 周同比: '-2.65' } }, { x: 1495296000000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '5.96', 周同比: '0.75' } }, { x: 1495382400000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '-4.07', 周同比: '2.99' } }, { x: 1495468800000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '-1.01', 周同比: '9.72' } }, { x: 1495555200000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-4.52', 周同比: '5.71' } }, { x: 1495641600000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-1.69', 周同比: '1.49' } }, { x: 1495728000000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '-1.74', 周同比: '1.62' } }, { x: 1495814400000, y: 0.07, value_arr: { value1: '0.07\u4ebf', 日环比: '3.15', 周同比: '-4.27' } }, { x: 1495900800000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '11.60', 周同比: '0.82' } }, { x: 1495987200000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '2.06', 周同比: '7.26' } }, { x: 1496073600000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '5.08', 周同比: '13.86' } }, { x: 1496160000000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '-11.17', 周同比: '5.94' } }, { x: 1496246400000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '2.01', 周同比: '9.93' } }, { x: 1496332800000, y: 0.08, value_arr: { value1: '0.08\u4ebf', 日环比: '1.69', 周同比: '13.77' } }, { x: 1496419200000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '12.52', 周同比: '24.11' } }, { x: 1496505600000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '6.55', 周同比: '18.50' } }, { x: 1496592000000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-1.70', 周同比: '14.13' } }, { x: 1496678400000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '-3.43', 周同比: '4.89' } }, { x: 1496764800000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '-2.45', 周同比: '15.18' } }, { x: 1496851200000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '6.30', 周同比: '20.03' } }, { x: 1496937600000, y: 0.09, value_arr: { value1: '0.09\u4ebf', 日环比: '-3.56', 周同比: '13.83' } }, { x: 1497024000000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '7.50', 周同比: '8.75' } }, { x: 1497110400000, y: 0.1, value_arr: { value1: '0.10\u4ebf', 日环比: '-1.92', 周同比: '0.11' } }] }],
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
