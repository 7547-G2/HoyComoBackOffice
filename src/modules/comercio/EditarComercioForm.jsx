import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { updateComercio } from './comercioReducer'
import { getTipoComerciosSelectOptions } from '../../utils/utils'

import Select from 'react-select'
import { Row, Col, FormControl } from 'react-bootstrap'
import { CustomFormField } from '../../utils/CustomFormField'

export class EditarComercioForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      updateForm: {
        nombre: { error: false, mensaje: '' },
        razonSocial: { error: false, mensaje: '' },
        numero: { error: false, mensaje: '' },
        codigoPostal: { error: false, mensaje: '' },
        calle: { error: false, mensaje: '' },
        email: { error: false, mensaje: '' },
        habilitado: { error: false, mensaje: '' },
        tipoComercio: { seleccionado: props.activeComercio.tipoComercio.id, error: false, mensaje: ''}
      }
    }
    this.updateTipoComercioSelect = this.updateTipoComercioSelect.bind(this)
    this.editarComercioSubmit = this.editarComercioSubmit.bind(this)
  }

  resetUpdateForm() {
    let updateForm = {
      nombre: { error: false, mensaje: '' },
      razonSocial: { error: false, mensaje: '' },
      numero: { error: false, mensaje: '' },
      codigoPostal: { error: false, mensaje: '' },
      calle: { error: false, mensaje: '' },
      email: { error: false, mensaje: '' },
      habilitado: { error: false, mensaje: '' },
      tipoComercio: { error: false, mensaje: '', seleccionado: this.state.tipoComercio.seleccionado},
    }
    this.setState({ ...this.state, updateForm: updateForm })
  }

  validarUpdateForm(nombre, razonSocial, numero, codigoPostal, calle, email, habilitado) {
    let formOk = true

    let updateForm = {
      nombre: { error: false, mensaje: '' },
      razonSocial: { error: false, mensaje: '' },
      numero: { error: false, mensaje: '' },
      codigoPostal: { error: false, mensaje: '' },
      calle: { error: false, mensaje: '' },
      email: { error: false, mensaje: '' },
      habilitado: { error: false, mensaje: '' },
      tipoComercio: this.state.updateForm.tipoComercio
    }

    if (razonSocial == null || razonSocial == '') {
      updateForm.razonSocial.error = true
      updateForm.razonSocial.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.razonSocial.error = false
      updateForm.razonSocial.mensaje = ''
    }

    if (numero == null || numero == '') {
      updateForm.numero.error = true
      updateForm.numero.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.numero.error = false
      updateForm.numero.mensaje = ''
    }

    if (codigoPostal == null || codigoPostal == '') {
      updateForm.codigoPostal.error = true
      updateForm.codigoPostal.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.codigoPostal.error = false
      updateForm.codigoPostal.mensaje = ''
    }

    if (calle == null || calle == '') {
      updateForm.calle.error = true
      updateForm.calle.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.calle.error = false
      updateForm.calle.mensaje = ''
    }

    if (calle == null || calle == '') {
      updateForm.calle.error = true
      updateForm.calle.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.calle.error = false
      updateForm.calle.mensaje = ''
    }

    if (email == null || email == '') {
      updateForm.email.error = true
      updateForm.email.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.email.error = false
      updateForm.email.mensaje = ''
    }

    if (habilitado == null || habilitado == '') {
      updateForm.habilitado.error = true
      updateForm.habilitado.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.habilitado.error = false
      updateForm.habilitado.mensaje = ''
    }

    if (this.state.updateForm.tipoComercio.seleccionado <= 0) {
      updateForm.tipoComercio.error = true
      updateForm.tipoComercio.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.tipoComercio.error = false
      updateForm.tipoComercio.mensaje = ''
    }

    this.setState({ ...this.state, updateForm: updateForm })

    return formOk
  }

  updateTipoComercioSelect (newValue) {
    let newUpdateForm = {...this.state.updateForm}
    newUpdateForm.tipoComercio.seleccionado = (newValue != null) ? newValue.value : -1
    this.setState({
      ...this.state, 
      updateForm: newUpdateForm
    })
  }
  editarComercioSubmit () {
    if (this.validarUpdateForm(ReactDOM.findDOMNode(this.nombreInput).value, 
      ReactDOM.findDOMNode(this.razonSocialInput).value, 
      ReactDOM.findDOMNode(this.numeroInput).value, 
      ReactDOM.findDOMNode(this.codigoPostalInput).value, 
      ReactDOM.findDOMNode(this.calleInput).value, 
      ReactDOM.findDOMNode(this.habilitadoInput).value, 
      ReactDOM.findDOMNode(this.emailInput).value,
      ReactDOM.findDOMNode(this.habilitadoInput).value)) {
      this.props.updateComercio(
        this.props.activeComercio.id,
        ReactDOM.findDOMNode(this.nombreInput).value,
        this.state.updateForm.tipoComercio.seleccionado, null, null)
    }
  }

  render() {
    return (
      <form>
        <Row>
          <Col lg={4} md={4}>
            <CustomFormField  validationState={this.state.updateForm.nombre.error ? 'error' : null} 
              validationMessage={this.state.updateForm.nombre.mensaje} bsSize="small" controlId="nombre" 
              label="Nombre" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.nombre} key="nombreInput" bsSize="small" 
                  ref={nombreInput => { this.nombreInput = nombreInput }} type="text"></FormControl>
              }/>
          </Col>
          <Col lg={4} md={4}>
            <CustomFormField  validationState={this.state.updateForm.calle.error ? 'error' : null} 
              validationMessage={this.state.updateForm.calle.mensaje} bsSize="small" controlId="calle" 
              label="Calle" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.calle} key="calleInput" bsSize="small" 
                  ref={calleInput => { this.calleInput = calleInput }} type="text"></FormControl>
              }/>
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField  validationState={this.state.updateForm.numero.error ? 'error' : null} 
              validationMessage={this.state.updateForm.numero.mensaje} bsSize="small" controlId="numero" 
              label="Numero" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.numero} key="numeroInput" bsSize="small" 
                  ref={numeroInput => { this.numeroInput = numeroInput }} type="text"></FormControl>
              }/>
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField  validationState={this.state.updateForm.codigoPostal.error ? 'error' : null} 
              validationMessage={this.state.updateForm.codigoPostal.mensaje} bsSize="small" controlId="codigoPostal" 
              label="Código Postal" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.codigoPostal} key="codigoPostalInput" bsSize="small" 
                  ref={codigoPostalInput => { this.codigoPostalInput = codigoPostalInput }} type="text"></FormControl>
              }/>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={4}>
            <CustomFormField  validationState={this.state.updateForm.razonSocial.error ? 'error' : null} 
              validationMessage={this.state.updateForm.razonSocial.mensaje} bsSize="small" controlId="razonSocial" 
              label="Razón Social" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.razonSocial} key="razonSocialInput" bsSize="small" 
                  ref={razonSocialInput => { this.razonSocialInput = razonSocialInput }} type="text"></FormControl>
              }/>
          </Col>
          <Col lg={4} md={4}>
            <CustomFormField  validationState={this.state.updateForm.email.error ? 'error' : null} 
              validationMessage={this.state.updateForm.email.mensaje} bsSize="small" controlId="email" 
              label="Email" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.email} key="emailInput" bsSize="small" 
                  ref={emailInput => { this.emailInput = emailInput }} type="text"></FormControl>
              }/>
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField validationState={this.state.updateForm.tipoComercio.error ? 'error' : null} 
              validationMessage={this.state.updateForm.tipoComercio.mensaje} bsSize="small" controlId="tipoComercioSelect" label="Tipo comercio" 
              inputComponent={
                <Select name="tipoComercioSelect" value={this.state.updateForm.tipoComercio.seleccionado}
                  options={getTipoComerciosSelectOptions(this.props.allTipoComercios,true)} id="tipoComercioSelect" 
                  key="tipoComercioSelect" onChange={this.updateTipoComercioSelect} placeholder="Seleccioná un tipo comerico"/>
              }/>
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField  validationState={this.state.updateForm.habilitado.error ? 'error' : null} 
              validationMessage={this.state.updateForm.habilitado.mensaje} bsSize="small" controlId="habilitado" 
              label="Habilitado" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.habilitado} key="habilitadoInput" bsSize="small" 
                  ref={habilitadoInput => { this.habilitadoInput = habilitadoInput }} type="text"></FormControl>
              }/>
          </Col>
        </Row>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => ({
  updateComercio: (idComercio, nombreComercio, tipoComercio, password, confirmacionPassword) => {
    dispatch(updateComercio(idComercio, nombreComercio, tipoComercio, password, confirmacionPassword))
  }
})

export default connect(null, mapDispatch, null, { withRef: true } )(EditarComercioForm)