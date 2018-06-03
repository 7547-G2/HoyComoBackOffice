import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { deshabilitarUsuario } from './usuarioReducer'
import { CustomModalPregunta } from '../../utils/CustomModalPregunta'
import { CustomFormField } from '../../utils/CustomFormField'
import { FormControl } from 'react-bootstrap'
import ReactDOM from 'react-dom'

export class HabilitarUsuarioModal extends React.Component {
  constructor() {
    super()
    this.state = {
      motivo: { error: false, mensaje: '' },
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.deshabilitar = this.deshabilitar.bind(this)
  }

  abrirModal(id) {
    this.setState({ ...this.state, idUsuario: id})
    this.modal.showModal()
  }

  deshabilitar() {
    let motivo = ReactDOM.findDOMNode(this.motivoInput).value
    if(this.validarMotivo(motivo)) {
      this.props.deshabilitarUsuario(this.state.idUsuario, motivo)
      this.modal.hideModal()
    }
  }

  validarMotivo(motivo) {
    let formOk = true

    let motivoState = { error: false, mensaje: '' }

    if (motivo == null || motivo == '') {
      motivoState.error = true
      motivoState.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      motivoState.error = false
      motivoState.mensaje = ''
    }

    this.setState({ ...this.state, motivo: motivoState })

    return formOk
  }

  getCrearModalBody() {
    let bodyRender = []
    bodyRender.push(
      <div key="habilitarUsuarioDiv">
        <Row key='0'>
          <Col md={12}>
            ¿Estás seguro de que deseas deshabilitar este usuario?
          </Col>
          <br/>
          <Col md={12}>
            <CustomFormField validationState={this.state.motivo.error ? 'error' : null}
              validationMessage={this.state.motivo.mensaje} bsSize="small" controlId="motivo"
              label="Motivo" inputComponent={
                <FormControl defaultValue='' key="motivoInput" bsSize="small" rows="2" style={{resize: 'vertical'}}
                  ref={motivoInput => { this.motivoInput = motivoInput }} type="text"  componentClass="textarea" ></FormControl>
              } />
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
    }}>Aceptar</Button>)

    return buttons
  }

  render() {
    return (
      <CustomModalPregunta key={'deshabilitarUsuarioModal'} title={'Deshabilitar usuario'} body={this.getCrearModalBody()}
        buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
    )
  }
}

const mapDispatch = (dispatch) => ({
  deshabilitarUsuario: (idUsuario, motivo) => {
    dispatch(deshabilitarUsuario(idUsuario, motivo))
  }
})



export default connect(null, mapDispatch, null, { withRef: true })(HabilitarUsuarioModal)