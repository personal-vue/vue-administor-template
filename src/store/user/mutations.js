import { UPDATE_USER_INFO, UPDATE_TOKEN, CLEAR_USER, UPDATE_ROLES } from './constant'

const mutations = {
  /**
 * 更新用户信息
 */
  [UPDATE_USER_INFO]: (state, userInfo) => {
    state.userInfo = Object.assign({}, state.userInfo, userInfo)
  },

  /**
 * 更新token的信息
 * tokens存储token，refreshToken(刷新token)，expiredTime(过期时间)
 */
  [UPDATE_TOKEN]: (state, token) => {
    state.token = token
  },

  /**
   * @description 清空token和用户信息
   */
  [CLEAR_USER]: (state) => {
    state.userInfo = null
    state.token = ''
    state.roles = []
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
