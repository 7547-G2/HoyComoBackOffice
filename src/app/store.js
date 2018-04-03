import { createStore, applyMiddleware, compose } from 'redux'
import mainReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist'


import  history  from '../history'

const store =  createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),            
      createLogger({ collapsed: true })
    ),autoRehydrate()
  )
)

persistStore(store)
  
export default store