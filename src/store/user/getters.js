const getters = {
  userInfo: (state) => state.userInfo,
  token: (state) => state.tokens.token,
  refreshToken: (state) => state.tokens.refreshToken,
  expiredTime: (state) => state.tokens.expiredTime,
  roles: (state) => state.roles
}

export default getters
