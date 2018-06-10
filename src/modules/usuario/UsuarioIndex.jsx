import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getUsuarios, clearUsuarios, clearAlert } from './usuarioReducer'
import BuscarUsuarioForm from './BuscarUsuarioForm'
import BuscarUsuarioTable from './BuscarUsuarioTable'
import HabilitarUsuarioModal from './HabilitarUsuarioModal'
import DeshabilitarUsuarioModal from './DeshabilitarUsuarioModal'
import { CustomAlert } from '../../utils/CustomAlert'

export class UsuarioIndex extends React.Component {
  constructor() {
    super()
    this.abrirModalCrearUsuario = this.abrirModalCrearUsuario.bind(this)
    this.abrirModalHabilitarUsuario = this.abrirModalHabilitarUsuario.bind(this)
    this.habilitar = this.habilitar.bind(this)
    this.abrirModalDeshabilitarUsuario = this.abrirModalDeshabilitarUsuario.bind(this)
    this.deshabilitar = this.deshabilitar.bind(this)
  }

  componentDidMount() {
    this.props.clearResult()
  }

  abrirModalCrearUsuario() {
    this.crearUsuarioModal.wrappedInstance.abrirModal()
  }

  habilitar(id) {
    this.abrirModalHabilitarUsuario(id)
  }

  abrirModalHabilitarUsuario(id) {
    this.HabilitarUsuarioModal.wrappedInstance.abrirModal(id)
  }

  deshabilitar(id) {
    this.abrirModalDeshabilitarUsuario(id)
  }

  abrirModalDeshabilitarUsuario(id) {
    this.DeshabilitarUsuarioModal.wrappedInstance.abrirModal(id)
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
        <BuscarUsuarioTable habilitar={this.habilitar}  deshabilitar={this.deshabilitar}/>  

        <HabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.HabilitarUsuarioModal = modal }} />
        <DeshabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.DeshabilitarUsuarioModal = modal }} /> 
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  usuarios: (nombre, apellido, estado) => {
    dispatch(getUsuarios(nombre, apellido, estado))
  },
  clearResult: () => {
    dispatch(clearUsuarios())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  },
})

const mapStateToProps = (state) => {
  return {
    alert: state.usuarioReducer.alert,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(UsuarioIndex))
