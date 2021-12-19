// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user/index'
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, // 公用
    permission
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, // 修改存储的状态
      paths: ['user'] // 存储的指定的模块的名字（存储某个模块对象）
    })
  ] // 状态持久化
})
