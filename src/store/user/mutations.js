import { UPDATE_USER_INFO, UPDATE_TOKENS, CLEAR_USER_INFO_AND_TOKENS, UPDATE_ROLES } from './constant'

const mutations = {
  /**
 * 更新用户信息
 */
  [UPDATE_USER_INFO]: (state, data) => {
    state.userInfo = Object.assign({}, state.userInfo, data)
  },

  /**
 * 更新token的信息
 * tokens存储token，refreshToken(刷新token)，expiredTime(过期时间)
 */
  [UPDATE_TOKENS]: (state, data) => {
    state.tokens = Object.assign({}, state.tokens, data)
  },

  /**
   * @description 清空token和用户信息
   */
  [CLEAR_USER_INFO_AND_TOKENS]: (state) => {
    state.userInfo = null
    state.tokens = null
  },

  /**
   * @description 更新roles
   * @param {*} state
   * @param {*} roles
   */
  [UPDATE_ROLES]: (state, roles) => {
    state.roles = roles
  }
}

export default mutations
