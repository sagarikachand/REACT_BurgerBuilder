import * as actionType from '../actions/actionTypes'



const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  redirectPath: '/'
}


const authStartAlert = (state, action) => {
  return {
    ...state,
    loading: true,
    error: false
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    loading: false,
    error: null,
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
  }
}

const setRedirectPath = (state, action) => {
  return {
    ...state,
    redirectPath: action.path
  }
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionType.AUTH_START_ALERT: return authStartAlert(state, action)
    case actionType.AUTH_SUCCESS: return authSuccess(state, action)
    case actionType.AUTH_FAIL: return authFail(state, action)
    case actionType.AUTH_LOGOUT: return authLogout(state, action)
    case actionType.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state, action)
    default: return state
  }
}

export default authReducer;