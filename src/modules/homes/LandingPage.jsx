import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Grid } from 'react-bootstrap'
import { obtenerDerivacionesPendientes, toogleLoading } from './homesReducer'
import { withRouter } from 'react-router-dom'
import { CustomCargando } from '../../utils/CustomCargando'
import DerivacionesEnlaceTable from './DerivacionesEnlaceTable'
import imageLogo from '../../utils/images/Logo.png'

export class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <h2>Bienvenido</h2>
        <Row>
          <Col lg={12}>
            <Image src={imageLogo} style={{  }}
              rounded responsive />
          </Col>
        </Row>
      </div>
    )
  }

}

export default withRouter(connect(null, null)(LandingPage))