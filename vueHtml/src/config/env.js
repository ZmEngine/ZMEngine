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
const appName = '玖月一'
let baseUrl = 'http://127.0.0.1:5759/weapp/'
let upFileUrl = 'http://127.0.0.1:5759/weapp/upload/save'
let FileUrl = 'http://127.0.0.1:8077/zmupload/'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:5759/weapp/'
  upFileUrl = 'http://127.0.0.1:5759/weapp/upload/save'
  FileUrl = 'http://127.0.0.1:8077/zmupload/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '/weapp/'
  upFileUrl = '/weapp/upload/save'
  FileUrl = '/zmupload/'
}
export default {
  vheight,
  appName,
  baseUrl,
  routerMode,
  upFileUrl,
  FileUrl,
  imgBaseUrl
}