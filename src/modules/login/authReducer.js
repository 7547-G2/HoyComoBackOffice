import axios from 'axios'
import { push } from 'react-router-redux'
import api from '../../config/api'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const LOGIN_ERROR = 'LOGIN_ERROR'
const CLEAR_ERRORS = 'CLEAR_ERRORS'

const initialState = {
  token: {},
  user: {},
  error: { message: '' },
  isAuthenticated: false,
}

// Action creators
export const loginError = err => ({
  type: LOGIN_ERROR, err
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const login = data => ({
  type: LOGIN_USER, data
})

export const logout = () => ({
  type: LOGOUT_USER
})

// Thunks
export const loginUser = (username, password) => dispatch => {
  // let body = { 'username': username, 'password': password }
  if(username == 'admin' && password == '1234'){
    dispatch(login({ user: {email: username}, token:'aaaa'}))
    dispatch(push('/')) 
  } else {
    dispatch(loginError('LOGIN_ERROR'))
  }
  // axios.post(api.login, body)
  //   .then(res => res.data)
  //   .then(data => {
  //     dispatch(login({ token: data.token, user: {email: username}}))
  //     dispatch(push('/'))
  //   })
  //   .catch(err => {
  //     dispatch(loginError(err))
  //   })
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      token: action.data.token,
      user: action.data.user,
      error: {},
      isAuthenticated: true
    }
  case LOGOUT_USER:
    return { ...state, user: {}, error: {}, isAuthenticated: false }
  case LOGIN_ERROR:
    return { ...state, user: {}, error: { message: 'Los datos son incorrectos. Verificalos y volvé a intentar.' }, isAuthenticated: false }
  case CLEAR_ERRORS:
    return { ...state, error: {} }
  default:
    return state
  }
}
