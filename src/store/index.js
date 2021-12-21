// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import app from './app/index'
import user from './user/index'
import permission from './permission'

Vue.use(Vuex)

// 应用信息持久化
const appPersistedState = createPersistedState({
  key: 'app',
  storage: window.sessionStorage, // 修改存储的状态
  paths: ['app'] // 存储的指定的模块的名字（存储某个模块对象）
})

// 用户信息持久化
const userPersistedState = createPersistedState({
  key: 'user',
  storage: window.sessionStorage, // 修改存储的状态
  paths: ['user'] // 存储的指定的模块的名字（存储某个模块对象）
})

export default new Vuex.Store({
  modules: {
    app,
    user, // 公用
    permission
  },
  plugins: [userPersistedState, appPersistedState] // 状态持久化
})
