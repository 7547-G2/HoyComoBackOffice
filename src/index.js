import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-select/dist/react-select.css'
import 'font-awesome/css/font-awesome.css'
import './dist/css/app.css'

import store from './app/store.js'
import App from './app/App'
import history from './history'

ReactDOM.render(
  (<Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>),
  document.getElementById('root'))
