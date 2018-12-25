// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import env from './config/env'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import {
  getList
} from "./service/getData";

Vue.prototype.env = env
$(function () {
  ZMTitle(env.appName)
  setUpload(env.upFileUrl)
  env.rooturl =window.location.href.split("#")[0]

  getList('weixinhp/getSign', {
      url: env.rooturl
    },
    function (r) {
      let jg = r.data.jg
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: jg.AppID, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: jg.timestamp, // 必填，生成签名的时间戳
        nonceStr: jg.noncestr, // 必填，生成签名的随机串
        signature: jg.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline','onMenuShareAppMessage','updateTimelineShareData','updateAppMessageShareData'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function(rc){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        console.log("微信准备好了",rc)
        setWxOk()
      //   wx.onMenuShareTimeline({
      //     title: fenxiangbiaoti, // 分享标题
      //     link: 'https://api.yunkucun.top/wenjuan/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: 'https://api.yunkucun.top/static/ziyuan/zmlogo.png', // 分享图标
      //     success:  function (r) {
      //       // 用户点击了分享后执行的回调函数
      //       fenxianghuidiao(r)
      //   }
      // })
      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log("微信调用失败了",res)
      });
    }
  )

})
Vue.use(MintUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    // 后退时回到之前的滚动的位置的
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   if (from.meta.keepAlive) {
    //     from.meta.savedPosition = document.body.scrollTop
    //   }
    //   return {
    //     x: 0,
    //     y: to.meta.savedPosition || 0
    //   }
    // }
  }
})

// 路由跳转钩子
router.beforeEach((to, from, next) => {
  // console.log("store.login",env.appName+'·'+to.meta.title,store.state.login);
  ZMTitle(env.appName + '·' + to.meta.title)
  // if (!store.state.login && to.path !== '/login'&& to.path !== '/ydlogin') {
  //   if(skey&&skey.length>0){
  //     store.state.login=true
  //     next()
  //     return
  //   }else{
  //     next('./login')
  //     return
  //   }
  // } 
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
