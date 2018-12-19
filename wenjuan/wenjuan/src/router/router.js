const home = () => import(/* webpackChunkName: "kaishi" */ '../pages/home.vue')
const wenti = () => import(/* webpackChunkName: "kaishi" */ '../pages/wenti.vue')
const jieguo = () => import(/* webpackChunkName: "kaishi" */ '../pages/jieguo.vue')
export default [
  // 地址为空时跳转home页面
  {
    path: '/',
    redirect: '/home'    
  },
  // 首页
  {
    path: '/home/:liuchengcode',
    component: home,
    meta : { title: '主页' }
  },
  // 问题页
  {
    name:'wenti',
    path: '/wenti/:liuchengcode/:banben/:wenticode',
    component: wenti,
    meta : { title: '问题' }    
  },
  // 结束页
  {
    name:'jieshu',
    path: '/jieguo/:wenti/:daan',
    component: jieguo,
    meta : { title: '结果' }
    
  }
  
]
