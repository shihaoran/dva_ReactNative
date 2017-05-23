/**
 * Created by shi on 2017/5/10.
 */
'use strict';
import { NativeModules } from 'react-native';

export const login = async () => {
  try {
    const {status, username} = await NativeModules.UuapAdapter.login();
    console.log(status)
    console.log(username)
    return {'status': status, 'username': username}
  } catch (e) {
    console.error(e);
    return {'status': false}
  }
}

export const getTicket = async () => {
  try {
    const a = await NativeModules.UuapAdapter.getTicket();
    return a
  } catch (e) {
    console.error(e);
    return {'status': false}
  }
}

export const getToken = async () => {
  try {
    const a = await NativeModules.UuapAdapter.getToken();
    return a
  } catch (e) {
    console.error(e);
    return {'status': false}
  }
}

export const forceUpdateToken = async () => {
  try {
    const a = await NativeModules.UuapAdapter.forceUpdateToken();
    return a
    return {'status': true}
  } catch (e) {
    console.error(e);
    return {'status': false}
  }
}