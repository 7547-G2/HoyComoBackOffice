import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { habilitarUsuario } from './usuarioReducer'
import { CustomModalPregunta } from '../../utils/CustomModalPregunta'

export class HabilitarUsuarioModal extends React.Component {
  constructor() {
    super()
    this.abrirModal = this.abrirModal.bind(this)
    this.habilitar = this.habilitar.bind(this)
  }

  abrirModal(id) {
    this.setState({ ...this.state, idUsuario: id})
    this.modal.showModal()
  }

  habilitar() {
    this.props.habilitarUsuario(this.state.idUsuario)
  }

  getCrearModalBody() {
    let bodyRender = []
    bodyRender.push(
      <div key="habilitarUsuarioDiv">
        <Row key='0'>
          <Col md={12}>
            ¿Estás seguro de que deseas habilitar este usuario?
          </Col>
        </Row>
      </div>)
    return bodyRender
  }

  getCrearModalButtons() {
    let buttons = []

    buttons.push(<Button key={'cerrarButton'} bsSize={'small'} onClick={() => {
      this.modal.hideModal()
    }}>Cerrar</Button>)
    buttons.push(<Button key={'createButton'} bsSize={'small'} bsStyle={'primary'} onClick={() => {
      this.habilitar()
      this.modal.hideModal()
    }}>Aceptar</Button>)

    return buttons
  }

  render() {
    return (
      <CustomModalPregunta key={'habilitarUsuarioModal'} title={'Habilitar usuario'} body={this.getCrearModalBody()}
        buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
    )
  }
}

const mapDispatch = (dispatch) => ({
  habilitarUsuario: (activeUsuario) => {
    dispatch(habilitarUsuario(activeUsuario))
  }
})



export default connect(null, mapDispatch, null, { withRef: true })(HabilitarUsuarioModal)