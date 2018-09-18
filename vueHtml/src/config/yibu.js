/* eslint-disable */
import env from './env'
const baseUrl = env.baseUrl
export default  (url = '', data = {}, huidiao,type = 'GET') => {
    url = baseUrl + url
    if (type === 'POST') {
      $.post(url, data,huidiao)
    } else {
      $.get(url, data, huidiao) 
    }
}
