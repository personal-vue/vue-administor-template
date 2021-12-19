import { SET_ROUTES } from './constant'
import { filterAsyncRoutes } from './utils'
import { asyncRoutes } from '@/router'

const actions = {
  [SET_ROUTES]: ({ commit }, roles) => {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit(SET_ROUTES, accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default actions
