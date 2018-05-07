import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { deshabilitarComercio } from './comercioReducer'
import { CustomModalPregunta } from '../../utils/CustomModalPregunta'

export class HabilitarComercioModal extends React.Component {
  constructor() {
    super()
    this.abrirModal = this.abrirModal.bind(this)
    this.deshabilitar = this.deshabilitar.bind(this)
  }

  abrirModal() {
    this.setState({ ...this.state})
    this.modal.showModal()
  }

  deshabilitar() {
    this.props.deshabilitarComercio(this.props.activeComercio)
  }

  getCrearModalBody() {
    let bodyRender = []
    bodyRender.push(
      <div key="habilitarComercioDiv">
        <Row key='0'>
          <Col md={12}>
            ¿Estás seguro de que deseas deshabilitar este comercio?
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
      this.deshabilitar()
      this.modal.hideModal()
    }}>Aceptar</Button>)

    return buttons
  }

  render() {
    return (
      <CustomModalPregunta key={'deshabilitarComercioModal'} title={'Deshabilitar comercio'} body={this.getCrearModalBody()}
        buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
    )
  }
}

const mapDispatch = (dispatch) => ({
  deshabilitarComercio: (activeComercio) => {
    dispatch(deshabilitarComercio(activeComercio))
  }
})



export default connect(null, mapDispatch, null, { withRef: true })(HabilitarComercioModal)