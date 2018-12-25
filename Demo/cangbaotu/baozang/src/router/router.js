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
    component: home
  },
  // 首页
  {
    path: '/home/:liuchengcode/:banben',
    component: home
  },
  // 问题页
  {
    name:'wenti',
    path: '/wenti/:liuchengcode/:banben/:wenticode',
    component: wenti   
  },
  // 结束页
  {
    name:'jieshu',
    path: '/jieguo/:liuchengcode/:banben/:wenti/:daan',
    component: jieguo
    
  }
  
]
