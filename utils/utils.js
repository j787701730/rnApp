/* eslint-disable no-undef */
import { ToastAndroid } from 'react-native';

export const pathName = 'https://www.anju.site/';

export function ajax(url, data, toast = true, sucFun = null, failFun = null) {
  return fetch(pathName + url, {
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((res) => {
      if (res.err_code === 0) {
        if (toast) {
          ToastAndroid.showWithGravity(
            res.err_msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        if (sucFun !== null) {
          sucFun(res);
        }
      } else if (res.err_code === 88888) {
        // 登录处理
        // const history = createHashHistory();
        // history.push("/user/login");
      } else {
        // if (toast) {
        ToastAndroid.showWithGravity(
          res.err_msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        // }
        if (failFun !== null) {
          failFun(res);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
