import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getUsuarios, clearUsuarios, obtenerTipoUsuarios, clearAlert } from './comercioReducer'
import BuscarUsuarioForm from './BuscarUsuarioForm'
import BuscarUsuarioTable from './BuscarUsuarioTable'
import { CustomAlert } from '../../utils/CustomAlert'

export class UsuarioIndex extends React.Component {
  constructor() {
    super()
    this.abrirModalCrearUsuario = this.abrirModalCrearUsuario.bind(this)
  }

  componentDidMount() {
    this.props.obtenerTipoUsuarios()
    this.props.clearResult()
  }

  abrirModalCrearUsuario() {
    this.crearUsuarioModal.wrappedInstance.abrirModal()
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8} lg={8} sm={8} xs={8}>
            <h4>Administración de usuarios</h4>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            <br />
          </Col>
        </Row>
        {(this.props.alert.text != null) &&
          <CustomAlert onDismiss={this.props.clearAlert} clear={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}
 
        <BuscarUsuarioForm />
        <br/>
        <BuscarUsuarioTable/>  

        <HabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.HabilitarUsuarioModal = modal }} />
        <DeshabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.DeshabilitarUsuarioModal = modal }} /> 
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  comercios: (nombre, email, organismo) => {
    dispatch(getUsuarios(nombre, email, organismo))
  },
  clearResult: () => {
    dispatch(clearUsuarios())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  },
  obtenerTipoUsuarios: () => {
    dispatch(obtenerTipoUsuarios())
  }
})

const mapStateToProps = (state) => {
  return {
    alert: state.comercioReducer.alert,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(UsuarioIndex))
