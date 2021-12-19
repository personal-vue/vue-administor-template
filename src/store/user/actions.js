import { UPDATE_USER_INFO, UPDATE_TOKENS, CLEAR_USER_INFO_AND_TOKENS, UPDATE_ROLES } from './constant'

const actions = {
  [UPDATE_USER_INFO]: (context, data) => {
    context.commit(UPDATE_USER_INFO, data)
  },

  [UPDATE_TOKENS]: (context, data) => {
    context.commit(UPDATE_TOKENS, data)
  },

  [CLEAR_USER_INFO_AND_TOKENS]: (context) => {
    context.commit(CLEAR_USER_INFO_AND_TOKENS)
  },

  [UPDATE_ROLES]: (context, roles) => {
    context.commit(UPDATE_ROLES, roles)
  }
}

export default actions
