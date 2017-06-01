/**
 * Created by shi on 2017/5/16.
 */
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info'

export const env = {
  apiEndPoint: 'https://mop.baidu.com/rest/mobile/api/1.0.0',
  appKey: 'uuapclient-35-N2dzyodwt4o3pYFHo7or',
  platform: (Platform.OS === 'ios') ? 'ios' : 'android',
  clientType: 'module',
  uuid: DeviceInfo.getUniqueID(),

  menuType: {
    kpi: 0,
    general: 1,
    favorite: 2,
  },

  pageLimit: 10,

  toastPosition: -100,


  actionGetMenuList: 'app/getMenuList',
  actionGetMeasureList: 'app/getMeasureList',
  actionGetMeasureFavorites: 'app/getMeasureFavorites',
  actionUpdateMeasureFavorite: 'app/updateMeasureFavorite',
  actionUpdateUserFeedback: 'app/updateUserFeedback',
}

