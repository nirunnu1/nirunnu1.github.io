import {
  UPDATE_AUTH_USER
} from './actions'

const INIT_STATE = {
  authUser: null,
  loadUser: false,
  send_forget_password_email: false,
}
const defaultUC = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      }
    }

    default:
      return state
  }
}

export default defaultUC