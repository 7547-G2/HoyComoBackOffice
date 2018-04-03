import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Grid } from 'react-bootstrap'
import { obtenerDerivacionesPendientes, toogleLoading } from './homesReducer'
import { withRouter } from 'react-router-dom'
import { CustomCargando } from '../../utils/CustomCargando'
import DerivacionesEnlaceTable from './DerivacionesEnlaceTable'

export class LandingPage extends React.Component {

  render() {
    return (
      <div>
        Bienvenido
      </div>

    )
  }

}

export default withRouter(connect(null, null)(LandingPage))