import yibu from '../config/yibu'
import {getStore} from '../config/zm_tools'


/**
 * 获取列表
 */
export const getList =function (url,data,huidiao) { 
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
 * 查询集合指定值
 * arr:集合
 * key：元素的属性
 * val: 检索值
 */
export const selArrByKey =function (arr,key,val) { 
  let ishava = false
  let obj = {}
// console.log('getbykey', this.ssmap)
  ishava = arr.some(function (a, i) {
      if (a[key] === val) {
          obj=a
          return true
      }
      return false
  })
  if (ishava) return obj
  return null
}
