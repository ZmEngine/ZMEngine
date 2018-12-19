/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let routerMode = 'hash'
let imgBaseUrl = ''
let vheight = 500
const appName = '问卷调查'
let baseUrl = 'http://127.0.0.1:5758/EngineApi/'
let upFileUrl = 'http://127.0.0.1:5758/EngineApi/upload/save'
let FileUrl = 'http://127.0.0.1:8077/zmupload/'
let rooturl = 'https://api.yunkucun.top/wenjuan/#/home'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://api.yunkucun.top/EngineApi/'//'http://127.0.0.1:5758/EngineApi/'
  upFileUrl = 'http://127.0.0.1:5758/EngineApi/upload/save'
  FileUrl = 'http://127.0.0.1:8077/zmupload/'
} else if (process.env.NODE_ENV === 'production') {
  rooturl = 'https://api.yunkucun.top/wenjuan/#/home'
  baseUrl = '/EngineApi/'
  upFileUrl = '/EngineApi/upload/save'
  FileUrl = '/EngineApi/'
}
export default {
  vheight,
  appName,
  rooturl,
  baseUrl,
  routerMode,
  upFileUrl,
  FileUrl,
  imgBaseUrl
}
