/**
 * Created by shi on 2017/5/16.
 */
import { env } from '../constants/environment';
import request from '../utils/request';

const head = {
  AppKey: env.appKey,
  Client: env.platform,
  ClientType: env.clientType,
  UUID: env.uuid,
}

export function getMenuList({ user, token, type }) {
  return request(`${env.apiEndPoint}?at=${token}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Header: {
        ...head,
        ST: token,
        User: user,
      },
      Body: {
        Action: env.actionGetMenuList,
        ResponseType: 'json',
        RequestParam: {
          type: (type === env.menuType.kpi) ? 'app_kpi' : 'app_general',
        }
      },
    })
  });
}

export function getMeasureList({ user, token, menuId, date, offset }) {
  return request(`${env.apiEndPoint}?at=${token}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Header: {
        ...head,
        ST: token,
        User: user,
      },
      Body: {
        Action: env.actionGetMeasureList,
        ResponseType: 'json',
        RequestParam: {
          offset: offset,
          menuId: menuId,
          limit: env.pageLimit,
          date: date,
        }
      },
    })
  });
}

export function getMeasureFavorites({ user, token, date, offset }) {
  return request(`${env.apiEndPoint}?at=${token}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Header: {
        ...head,
        ST: token,
        User: user,
      },
      Body: {
        Action: env.actionGetMeasureFavorites,
        ResponseType: 'json',
        RequestParam: {
          offset: offset,
          limit: env.pageLimit,
          date: date,
        }
      },
    })
  });
}

export function updateMeasureFavorite({ user, token, measureId, status }) {
  return request(`${env.apiEndPoint}?at=${token}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Header: {
        ...head,
        ST: token,
        User: user,
      },
      Body: {
        Action: env.actionUpdateUserFeedback,
        ResponseType: 'json',
        RequestParam: {
          measureId: measureId,
          status: status,
        }
      },
    })
  });
}

export function updateUserFeedback({ user, token, content }) {
  return request(`${env.apiEndPoint}?at=${token}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Header: {
        ...head,
        ST: token,
        User: user,
      },
      Body: {
        Action: env.actionUpdateUserFeedback,
        ResponseType: 'json',
        RequestParam: {
          content: content,
        }
      },
    })
  });
}

