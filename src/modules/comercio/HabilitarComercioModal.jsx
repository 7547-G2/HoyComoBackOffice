import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { habilitarComercio } from './comercioReducer'
import { CustomModalPregunta } from '../../utils/CustomModalPregunta'

export class HabilitarComercioModal extends React.Component {
  constructor() {
    super()
    this.abrirModal = this.abrirModal.bind(this)
    this.habilitar = this.habilitar.bind(this)
  }

  abrirModal() {
    this.setState({ ...this.state})
    this.modal.showModal()
  }

  habilitar() {
    this.props.habilitarComercio(this.props.activeComercio)
  }

  getCrearModalBody() {
    let bodyRender = []
    bodyRender.push(
      <div key="habilitarComercioDiv">
        <Row key='0'>
          <Col md={12}>
            ¿Estás seguro de que deseas habilitar este comercio?
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
      <CustomModalPregunta bsSize="" key={'habilitarComercioModal'} title={'Habilitar comercio'} body={this.getCrearModalBody()}
        buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
    )
  }
}

const mapDispatch = (dispatch) => ({
  habilitarComercio: (activeComercio) => {
    dispatch(habilitarComercio(activeComercio))
  }
})



export default connect(null, mapDispatch, null, { withRef: true })(HabilitarComercioModal)