/* Dependencies */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer'
import comercioReducer from '../modules/comercio/comercioReducer'
import usuarioReducer from '../modules/usuario/usuarioReducer'
import dashboardReducer from '../modules/dashboard/dashboardReducer'

/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  comercioReducer,
  usuarioReducer,
  dashboardReducer,
  authReducer,
  routerReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer