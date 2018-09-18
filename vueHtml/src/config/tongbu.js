/* eslint-disable */
import env from './env'
const baseUrl = env.baseUrl
export default async (url = '', data = {}, type = 'GET') => {
  return new Promise((resolve, reject) => {
    url = baseUrl + url
    if (type === 'POST') {
      $.post(url, data, function (r) {
        console.log(r);
        if (r.data.isok) {
          // window.location.href = "./index.html?skey=" + r.skey;
        } else {
          //that.loginerr = "账号密码错误";
        }
        resolve(r)
      })
    } else {
      $.post(url, data, function (r) {
        console.log(r);
        if (r.data.isok) {
          // window.location.href = "./index.html?skey=" + r.skey;
        } else {
         // that.loginerr = "账号密码错误";
        }
        resolve(r)
      })
    }
  });
}
