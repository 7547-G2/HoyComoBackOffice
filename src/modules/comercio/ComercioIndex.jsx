import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getComercios, clearComercios, obtenerTipoComercios, clearAlert } from './comercioReducer'
import CrearComercioModal from './CrearComercioModal'
import BuscarComercioForm from './BuscarComercioForm'
import BuscarComercioTable from './BuscarComercioTable'
import { CustomAlert } from '../../utils/CustomAlert'

export class ComercioIndex extends React.Component {
  constructor() {
    super()
    this.abrirModalCrearComercio = this.abrirModalCrearComercio.bind(this)
  }

  componentDidMount() {
    this.props.obtenerTipoComercios()
    this.props.clearResult()
  }

  abrirModalCrearComercio() {
    this.crearComercioModal.wrappedInstance.abrirModal()
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8} lg={8} sm={8} xs={8}>
            <h4>Administración de comercios</h4>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            <br />
            <Button bsStyle="success" bsSize="xsmall" className="pull-right" onClick={this.abrirModalCrearComercio}>
              <Glyphicon glyph="plus" />Nuevo comercio
            </Button>
          </Col>
        </Row>
        {(this.props.alert.text != null) &&
          <CustomAlert onDismiss={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}
 
        <BuscarComercioForm allOrganismos={this.props.allOrganismos} />

        <BuscarComercioTable />  

        <CrearComercioModal allTipoComercios={this.props.allTipoComercios} ref={(modal) => { this.crearComercioModal = modal }} />
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  comercios: (nombre, email, organismo) => {
    dispatch(getComercios(nombre, email, organismo))
  },
  clearResult: () => {
    dispatch(clearComercios())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  },
  obtenerTipoComercios: () => {
    dispatch(obtenerTipoComercios())
  }
})

const mapStateToProps = (state) => {
  return {
    alert: state.comercioReducer.alert,
    allTipoComercios: state.comercioReducer.allTipoComercios,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(ComercioIndex))
