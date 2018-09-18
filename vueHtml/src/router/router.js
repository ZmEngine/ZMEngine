const home = () => import(/* webpackChunkName: "kaishi" */ '../pages/home.vue')
const login = () => import(/* webpackChunkName: "kaishi" */ '../pages/login.vue')
const huanying = () => import(/* webpackChunkName: "home" */ '../pages/huanying.vue')
const fenlei = () => import(/* webpackChunkName: "home" */ '../pages/fenlei.vue')
const sucai = () => import(/* webpackChunkName: "home" */ '../pages/sucai.vue')
const banner = () => import(/* webpackChunkName: "home" */ '../pages/banner.vue')
const shangjiaruzhu = () => import(/* webpackChunkName: "home" */ '../pages/shangjiaruzhu.vue')
const shualiulan = () => import(/* webpackChunkName: "home" */ '../pages/shualiulan.vue')
const xiugaimima = () => import(/* webpackChunkName: "home" */ '../pages/xiugaimima.vue')
const wenzhang = () => import(/* webpackChunkName: "guanli" */ '../pages/wenzhang.vue')
const shipin = () => import(/* webpackChunkName: "guanli" */ '../pages/shipin.vue')
const shangjia = () => import(/* webpackChunkName: "guanli" */ '../pages/shangjia.vue')
const shangjiaxiangqing = () => import(/* webpackChunkName: "xiangqing" */ '../pages/shangjiaxiangqing.vue')
const fangyuan = () => import(/* webpackChunkName: "guanli" */ '../pages/fangyuan.vue')
const fangyuanxiangqing = () => import(/* webpackChunkName: "xiangqing" */ '../pages/fangyuanxiangqing.vue')

const ydlogin = () => import(/* webpackChunkName: "yd" */ '../pages/yd_login.vue')
const ydhome = () => import(/* webpackChunkName: "yd" */ '../pages/yd_home.vue')
const ydfangyuan = () => import(/* webpackChunkName: "yd" */ '../pages/yd_fangyuan.vue')
const ydshangjia = () => import(/* webpackChunkName: "yd" */ '../pages/yd_shangjia.vue')
const ydshangjiaxiangqing = () => import(/* webpackChunkName: "yd" */ '../pages/yd_shangjiaxiangqing.vue')
const ydfangyuanxiangqing = () => import(/* webpackChunkName: "yd" */ '../pages/yd_fangyuanxiangqing.vue')
export default [
  // 地址为空时跳转home页面
  {
    path: '/',
    redirect: '/home'    
  },
  // 登陆页
  {
    path: '/login',
    component: login,
    meta : { title: '登录' }
  },
  { name:'shangjiaxiangqing', path: '/shangjiaxiangqing/:pid', component: shangjiaxiangqing, meta : { title: '商家详情' } },
  { name:'fangyuanxiangqing', path: '/fangyuanxiangqing/:pid', component: fangyuanxiangqing, meta : { title: '房源详情' } },
  // 首页
  {
    path: '/home',
    component: home,
    meta : { title: '主页' },
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      { name:'huanying', path: '', component: huanying, meta : { title: '后台管理' } },
      { name:'fenlei', path: 'fenlei', component: fenlei, meta : { title: '设定分类' } },
      { name:'sucai', path: 'sucai', component: sucai, meta : { title: '素材管理' } },
      { name:'banner', path: 'banner', component: banner, meta : { title: 'banner管理' } },
      { name:'shangjiaruzhu', path: 'shangjiaruzhu', component: shangjiaruzhu, meta : { title: '商家入驻说明' } },
      { name:'shualiulan', path: 'shualiulan', component: shualiulan, meta : { title: '刷浏览' } },
      { name:'xiugaimima', path: 'xiugaimima', component: xiugaimima, meta : { title: '修改密码' } },
      { name:'wenzhang', path: 'wenzhang', component: wenzhang, meta : { title: '文章管理' } },
      { name:'shipin', path: 'shipin', component: shipin, meta : { title: '视频管理' } },
      { name:'shangjia', path: 'shangjia', component: shangjia, meta : { title: '商家管理' } },
      { name:'fangyuan', path: 'fangyuan', component: fangyuan, meta : { title: '房源管理' } }
      // ...其他子路由
    ]
  },
  {
    path: '/ydlogin',
    component: ydlogin,
    meta : { title: '登录' }
  },
  {
    path: '/ydhome',
    component: ydhome,
    meta : { title: '主页' },
    children: [
      { name:'ydshangjia', path: 'shangjia', component: ydshangjia, meta : { title: '商家管理',istabbar:true } },
      { name:'ydfangyuan', path: 'fangyuan', component: ydfangyuan, meta : { title: '房源管理' ,istabbar:true } },
      { name:'shangjiaxiangqing', path: 'shangjiaxiangqing/:pid', component: ydshangjiaxiangqing, meta : { title: '商家详情' } },
      { name:'fangyuanxiangqing', path: 'fangyuanxiangqing/:pid', component: ydfangyuanxiangqing, meta : { title: '房源详情' } },
      // ...其他子路由
    ]
  }    
]
