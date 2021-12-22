import { UPDATE_USER_INFO, UPDATE_TOKEN, CLEAR_USER, UPDATE_ROLES } from './constant'

const actions = {
  [UPDATE_USER_INFO]: (context, data) => {
    context.commit(UPDATE_USER_INFO, data)
  },

  [UPDATE_TOKEN]: (context, data) => {
    context.commit(UPDATE_TOKEN, data)
  },

  [CLEAR_USER]: (context) => {
    context.commit(CLEAR_USER)
  },

  [UPDATE_ROLES]: (context, roles) => {
    context.commit(UPDATE_ROLES, roles)
  }
}

export default actions
