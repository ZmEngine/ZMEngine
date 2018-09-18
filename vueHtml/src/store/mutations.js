import {setStore} from '../config/zm_tools'

export default {
  // 记录用户信息
  'InsYongHu' (state, info) {
    state.userInfo = info
    state.login = true
    setStore('user_id', info.key)
  },
  'DelYongHu' (state, info) {
    state.userInfo = null
    state.login = false
    setStore('user_id', '')
  }
}
