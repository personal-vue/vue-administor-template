import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR, UPDATE_DEFAULT_OPEN } from './constant'

const actions = {
  [TOGGLE_SIDEBAR]: (context) => {
    context.commit(TOGGLE_SIDEBAR)
  },

  [CLOSE_SIDEBAR]: (context, { withoutAnimation }) => {
    context.commit(CLOSE_SIDEBAR, withoutAnimation)
  },

  [UPDATE_DEFAULT_OPEN]: (context, defaultOpen) => {
    context.commit(UPDATE_DEFAULT_OPEN, defaultOpen)
  }
}

export default actions
