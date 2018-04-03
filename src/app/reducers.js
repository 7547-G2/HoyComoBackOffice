/* Dependencies */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer'
import comercioReducer from '../modules/comercio/comercioReducer'

/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  comercioReducer,
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