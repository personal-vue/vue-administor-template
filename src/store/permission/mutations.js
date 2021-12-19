import { SET_ROUTES } from './constant'
import { constantRoutes } from '@/router'

const mutations = {
  [SET_ROUTES]: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

export default mutations
