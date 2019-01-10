const home = () => import(/* webpackChunkName: "kaishi" */ '../pages/home.vue')
const login = () => import(/* webpackChunkName: "kaishi" */ '../pages/login.vue')
const huanying = () => import(/* webpackChunkName: "home" */ '../pages/huanying.vue')
const shuoming = () => import(/* webpackChunkName: "home" */ '../pages/shuoming.vue')
const xiugaimima = () => import(/* webpackChunkName: "home" */ '../pages/xiugaimima.vue')
const sucai = () => import(/* webpackChunkName: "home" */ '../pages/sucai.vue')
const fuwu = () => import(/* webpackChunkName: "home" */ '../pages/fuwu.vue')
const liucheng = () => import(/* webpackChunkName: "home" */ '../pages/liucheng.vue')

const kongbai = () => import(/* webpackChunkName: "kaishi" */ '../pages/kongbai.vue')
const peizhi = () => import(/* webpackChunkName: "home" */ '../pages/peizhi.vue')
const jiedian = () => import(/* webpackChunkName: "home" */ '../pages/jiedian.vue')

const neirongzujian = () => import(/* webpackChunkName: "jingtaiyemian" */ '../pages/neirongzujian.vue')
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
  },  // 首页
  {
    path: '/home',
    component: home,
    meta : { title: '主页' },
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      { name:'huanying', path: '', component: huanying, meta : { title: '后台管理' } },
      { name:'shuoming', path: 'shuoming', component: shuoming, meta : { title: '调用说明' } },
      { name:'sucai', path: 'sucai', component: sucai, meta : { title: '素材管理' } },
      { name:'xiugaimima', path: 'xiugaimima', component: xiugaimima, meta : { title: '修改密码' } },
      { name:'fuwu', path: 'fuwu', component: fuwu, meta : { title: '服务列表' } },
      { name:'liucheng', path: 'liucheng', component: liucheng, meta : { title: '流程列表' } },
      {name:'neirongzujian',path:'neirongzujian',component:neirongzujian,meta:{title:'组件配置'}}
      // ...其他子路由
    ]
  },  // 首页
  {
    path: '/kongbai',
    component: kongbai,
    meta : { title: '主页' },
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      { name:'peizhi', path: 'peizhi/:workflow/:banben', component: peizhi, meta : { title: '流程配置' } },
      { name:'jiedian', path: 'jiedian/:workflow/:banben/:jiedian', component: jiedian, meta : { title: '节点配置' } }
      // ...其他子路由
    ]
  }
]
