/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {getStore} from './config/zm_tools'
import env from './config/env'
import ElementUI from 'element-ui';//ElementUI
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import VueLazyLoad from 'vue-lazyload'//异步加载
Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading.png'
})

import VueHtml5Editor from 'vue-html5-editor' // 富文本编辑器
Vue.use(VueHtml5Editor,{
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
  name: "vue-html5-editor",
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  showModuleName: false,
  language: "zh-cn",
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 10 * 1024,   
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText){
        //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
        var json = JSON.parse(responseText)
        if (!json.ok) {
            alert(json.msg)
        } else {
            return json.data
        }
    }
   }
  }
);




Vue.prototype.env = env

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    // 后退时回到之前的滚动的位置的
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})

// 路由跳转钩子
router.beforeEach((to, from, next) => {
 // console.log("store.login",env.appName+'·'+to.meta.title,store.state.login);
 let skey=getStore('user_id')
  ZMTitle(env.appName+'·'+to.meta.title)
  console.log("beforeEach",store.state)
  if (!store.state.login && to.path !== '/login'&& to.path !== '/ydlogin') {
    if(skey&&skey.length>0){
      store.state.login=true
      next()
    }else{
      next('./login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
