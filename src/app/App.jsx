//  Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'

// Imports
import Login from '../modules/login/Login'
import PrivateRoute from '../utils/PrivateRoute'
import { Home } from '../layout/Home'
import WebNavbar from '../layout/WebNavbar'
import ComercioIndex from '../modules/comercio/ComercioIndex'
import UsuarioIndex from '../modules/usuario/UsuarioIndex'
import DashboardIndex from '../modules/dashboard/DashboardIndex'
import EditarComercio from '../modules/comercio/EditarComercio'
import { Grid } from 'react-bootstrap'
import store from './store.js'

export class App extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <WebNavbar />
        <Grid >
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact={true} path="/" permiso={true} component={Home} />
            <PrivateRoute exact={false} path="/comercios/:id" permiso={true} component={EditarComercio} />
            <PrivateRoute exact={true} path="/comercios" permiso={true} component={ComercioIndex} />
            <PrivateRoute exact={true} path="/usuarios" permiso={true} component={UsuarioIndex} />
            <PrivateRoute exact={true} path="/dashboard" permiso={true} component={DashboardIndex} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(App))