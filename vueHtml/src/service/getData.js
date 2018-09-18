import tongbu from '../config/tongbu'
import yibu from '../config/yibu'
import { Message } from 'element-ui';
import {getStore} from '../config/zm_tools'
/**
 * 获取当前登陆人信息
 */
export const getUser = (code, pwd) => tongbu('guanliyuan/login', {
  type: Math.random(),
  skey:getStore('user_id'),
  username: code,
  pwd: pwd
})
/**
 * 同步获取列表
 */
export const getListbytongbu = async function (url,data) { 
  data.type=Math.random()
  data.skey=getStore('user_id')
  let jg = await tongbu(url, data)
  return jg
}
/**
 * 获取列表
 */
export const getList =function (url,data,huidiao) { 
  data.type=Math.random()
  data.skey=getStore('user_id')
  yibu(url, data,huidiao)
}
/**
 * 获取列表
 */
export const getInfo =function (url,data,huidiao) { 
  data.type=Math.random()
  data.skey=getStore('user_id')
  yibu(url, data,huidiao)
}
/**
 * 添加内容
 */
export const postInfo =function (url,data,huidiao) { 
  data.type=Math.random()
  data.skey=getStore('user_id')
  yibu(url, data ,function(r){
  if (r.data.isok) {   
    huidiao(r.data)
  } else {
    Message({
      type: 'error',
      message: '保存失败：' + (r.data.msg ? r.data.msg : r.data.error)
    });
  }
},'POST')
}
/**
 * 删除信息
 */
export const delInfo =function (url,data,huidiao) { 
  data.type=Math.random()
  data.skey=getStore('user_id')
  yibu(url, data ,function(r){
  if (r.data.isok) {
    Message({
      type: 'success',
      message: '删除成功!'
    });
    huidiao(r.data)
  } else {
    Message({
      type: 'error',
      message: '删除失败' + (r.data.jg ? r.data.jg : r.data.error)
    });
  }
})
}
/**
 * banner列表
 */
export const getBanner = function () {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      text: '首页',
      src: '/home'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      text: '联盟',
      src: '/login'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
      text: '房源',
      src: '/minitTest'
    }
  ]
}
/**
 * 分类信息
 */
export const getFenlei = function () {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      text: '首页',
      src: '/home'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      text: '联盟',
      src: '/login'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
      text: '房源',
      src: '/minitTest'
    }
  ]
}
/**
 * 首页文章列表
 */
export const getWenZhangsy = function () {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      biaoti: '首页',
      shijian: '2018-08-01',
      yueduliang: 100,
      src: '/wenzhangxiangqing/123'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      biaoti: '测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，',
      shijian: '2018-08-01',
      yueduliang: 99999,
      src: '/wenzhangxiangqing/erew'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
      biaoti: '首页',
      shijian: '2018-08-01',
      yueduliang: 100,
      src: '/minitTest'
    }
  ]
}
/**
 * 获取单个文章
 */
export const getWenZhangOne = function (pid) {
  return {
    img: 'http://127.0.0.1:8080/static/img/shouye1.png',
    neirong: '测试文章内容。，测试文章内容。，测试文章内容。，测试文章内容。，测试文章内容。，<br /> 测试文章内容。，测试文章内容。，测试文章内容。，测试文章内容。，测试文章内容。，',
    biaoti: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
    shijian: '2018-08-01',
    yueduliang: 1100,
    dianzan: 999
  }
}
/**
 * 首页视频列表
 */
export const getShiPinsy = function () {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      biaoti: '首页',
      shijian: '2018-08-01',
      yueduliang: 100,
      src: '/shipinxiangqing/123'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      biaoti: '测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，测试文字多一些，',
      shijian: '2018-08-01',
      yueduliang: 99999,
      src: '/login'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
      biaoti: '首页',
      shijian: '2018-08-01',
      yueduliang: 100,
      src: '/minitTest'
    }
  ]
}
/**
 * 获取单个视频
 */
export const getShiPinOne = function (pid) {
  return {
    type: "video/mp4",
    img: 'http://127.0.0.1:8080/static/img/shouye1.png',
    vieo: 'http://127.0.0.1:8080/static/ziyuan/testvieo.mp4',
    biaoti: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
    shijian: '2018-08-01',
    yueduliang: 1100,
    dianzan: 999
  }
}
/**
 * 分类信息
 */
export const getShangJiaFenlei = function () {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      text: '棋类'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      text: '乐器'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
      text: '书法'
    }
  ]
}
/**
 * 获取联盟首页商家列表
 */
export const getShangJiasy = function (pid) {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
      shijian: '2018-08-01',
      src: '/shangjia/1',
      yueduliang: 1100,
      dianzan: 999
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      name: 'xxx',
      src: '/shangjia/2',
      shijian: '2018-08-01',
      yueduliang: 1100,
      dianzan: 999
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan.png',
      name: '测试商家2',
      src: '/shangjia/3',
      shijian: '2018-08-01',
      yueduliang: 1100,
      dianzan: 999
    }
  ]
}
/**
 * 获取联盟首页商家分类列表
 */
export const getShangJiaFenLeiLieBiao = function (pid) {
  return {
    name: '棋类',
    shangjias: [{
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
        jianjie: '测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,',
        dianhua: '010-1234567',
        src: '/shangjiaxiangqing/1',
      },
      {
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
        jianjie: '测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,',
        dianhua: '010-1234567',
        src: '/shangjiaxiangqing/1',
      },
      {
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
        jianjie: '测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,测试简介,',
        dianhua: '010-1234567',
        src: '/shangjiaxiangqing/1',
      }
    ]
  }
}

/**
 * 获取商家入驻说明
 */
export const getRuZhuShuoMing = function (pid) {
  return {
    dianhua: '010-123456789',
    shuoming: '温馨提示：请入驻商家认真填写相关信息，上传营业执照，申请成功后需等待平台审核，审核通过后将有工作人员与您取得联系，感谢您对玖月一文化的信任。',
    dizhi: {
      fullname: '海淀区白家疃13号院1号楼1010',
      name: '玖月一',
      zuobiao: [116.397026, 39.918058]
    }
  }
}
/**
 * 上传商家信息
 */
export const postsjinfo = function (sjinfo, huidiao) {
  console.log("sjinfo", sjinfo)
  huidiao({
    isok: true,
    msg: 'ok'
  })
}
/**
 * 获取商家详细信息
 */
export const getShangjiaInfo = function (pid) {
  return {
    sjtp: [{
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        text: '棋类'
      },
      {
        pid: '2',
        img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
        text: '乐器'
      },
      {
        pid: '3',
        img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
        text: '书法'
      }
    ],
    sjmc: '大猛哥培训班',
    kssj: '08:00',
    jssj: '18:00',
    dianhua: '010-12345678',
    sjlx: "棋类",
    sjjs: "很好啊很好大方点啊<div >dasdfasdfasd</div><img src='http://127.0.0.1:8080/static/img/fangyuan1.png'/>",
    sjdz: '玖月一',
    sjdzfullname: '海淀区白家疃',
    sjdzzuobiao: (pid == '1' ? [116.183462, 40.091782] : [116.397026, 39.918058])
  }
}
/**
 * 获取地区分类
 */
export const getDiQus = function (sjinfo, huidiao) {
  return [{
      pid: '1',
      code: '东城区',
      name: '东城区'
    },
    {
      pid: '2',
      code: '西城区',
      name: '西城区'
    },
    {
      pid: '3',
      code: '朝阳区',
      name: '朝阳区'
    },
    {
      pid: '4',
      code: '海淀区',
      name: '海淀区'
    },
    {
      pid: '5',
      code: '丰台区',
      name: '丰台区'
    },
    {
      pid: '6',
      code: '通州区',
      name: '通州区'
    },
    {
      pid: '7',
      code: '石景山区',
      name: '石景山区'
    },
    {
      pid: '8',
      code: '顺义区',
      name: '顺义区'
    },
    {
      pid: '9',
      code: '房山区',
      name: '房山区'
    },
    {
      pid: '10',
      code: '昌平区',
      name: '昌平区'
    },
    {
      pid: '11',
      code: '大兴区',
      name: '大兴区'
    },
    {
      pid: '12',
      code: '门头沟区',
      name: '门头沟区'
    },
    {
      pid: '13',
      code: '怀柔区',
      name: '怀柔区'
    },
    {
      pid: '14',
      code: '平谷区',
      name: '平谷区'
    },
    {
      pid: '15',
      code: '密云区',
      name: '密云区'
    },
    {
      pid: '16',
      code: '延庆区',
      name: '延庆区'
    }
  ]
}
/**
 * 获取房源综合列表
 */
export const getFangYuanLieBiao = function (pid) {
  return [{
      pid: '1',
      img: 'http://127.0.0.1:8080/static/img/shouye1.png',
      name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
      leixing: '二室一厅',
      daxiao: '88',
      youdian: '距离东直门地铁站1公里',
      jiage: '999 万'
    },
    {
      pid: '2',
      img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
      name: 'xxx',
      leixing: '二室一厅',
      daxiao: '88',
      youdian: '距离东直门地铁站1公里',
      jiage: '999 万'
    },
    {
      pid: '3',
      img: 'http://127.0.0.1:8080/static/img/fangyuan.png',
      name: '测试商家2',
      leixing: '二室一厅',
      daxiao: '88',
      youdian: '距离东直门地铁站1公里',
      jiage: '999 万'
    }
  ]
}
/**
 * 获取房源分类列表
 */
export const getFangYuanFenLeiLieBiao = function (pid) {
  return {
    name: '东城区',
    fangyuans: [{
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        name: '测试视频,测试视频,测试视频测试视频测试视频测试视频测试视频测试视频,',
        leixing: '二室一厅',
        daxiao: '88',
        youdian: '距离东直门地铁站1公里',
        jiage: '999 万'
      },
      {
        pid: '2',
        img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
        name: 'xxx',
        leixing: '二室一厅',
        daxiao: '88',
        youdian: '距离东直门地铁站1公里',
        jiage: '999 万'
      },
      {
        pid: '3',
        img: 'http://127.0.0.1:8080/static/img/fangyuan.png',
        name: '测试商家2',
        leixing: '二室一厅',
        daxiao: '88',
        youdian: '距离东直门地铁站1公里',
        jiage: '999 万'
      }
    ]
  }
}
/**
 * 获取楼层分类
 */
export const getLouCeng = function (pid) {
  let arrlc = []
  let arrlczs = []
  for (let i = 1; i < 40; i++) {
    let lc = {
      key: i,
      name: i + '层'
    }
    let lczs = {
      key: i,
      name: '共' + i + '层'
    }
    arrlc.push(lc)
    arrlczs.push(lczs)
  }
  return [{
    flex: 1,
    values: arrlc,
    className: 'slot1',
    textAlign: 'left'
  }, {
    divider: true,
    content: '-',
    className: 'slot2'
  }, {
    flex: 1,
    values: arrlczs,
    className: 'slot3',
    textAlign: 'right'
  }]
}
export const getTingShi = function (pid) {
  let arr_s = []
  let arr_t = []
  let arr_w = []
  for (let i = 1; i < 10; i++) {
    let s = {
      key: i,
      name: i + '室'
    }
    let t = {
      key: i,
      name: i + '厅'
    }
    let w = {
      key: i,
      name: i + '卫'
    }
    arr_s.push(s)
    arr_t.push(t)
    arr_w.push(w)
  }
  return [{
    flex: 1,
    values: arr_s,
    className: 'slot1',
    textAlign: 'left'
  }, {
    flex: 1,
    values: arr_t,
    className: 'slot2',
    textAlign: 'center'
  }, {
    flex: 1,
    values: arr_w,
    className: 'slot3',
    textAlign: 'right'
  }]
}
/**
 * 上传房源信息
 */
export const postfyinfo = function (fyinfo, huidiao) {
  console.log("sjinfo", fyinfo)
  huidiao({
    isok: true,
    msg: 'ok'
  })
}
/**
 * 获取商家详细信息
 */
export const getFangYuanInfo = function (pid) {
  return {
    fytp: [{
        pid: '1',
        img: 'http://127.0.0.1:8080/static/img/shouye1.png',
        text: '棋类'
      },
      {
        pid: '2',
        img: 'http://127.0.0.1:8080/static/img/lianmeng1.png',
        text: '乐器'
      },
      {
        pid: '3',
        img: 'http://127.0.0.1:8080/static/img/fangyuan1.png',
        text: '书法'
      }
    ],
    xqmc: '这是一个小区名称',
    fyts_s: '3',
    fyts_t: '2',
    fyts_w: '1',
    fyjg:'9999.00',
    fyqy: '朝阳区',
    fylc: '5',
    fylczs: '6',
    dianhua: '1311234567',
    mianji: '88',
    fkfs: '押一付一',
    fydz: '朝阳区亮马店小区8号楼',
    fyld: '距离地铁超级近，合租是一个大美女'
  }
}
