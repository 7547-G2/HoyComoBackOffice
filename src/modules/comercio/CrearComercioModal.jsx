import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Button, FormControl } from 'react-bootstrap'
import { createComercio } from './comercioReducer'
import { getTipoComerciosSelectOptions } from '../../utils/utils'
import { CustomModal } from '../../utils/CustomModal'
import { CustomFormField } from '../../utils/CustomFormField'
import Select from 'react-select'

export class CrearComercioModal extends React.Component {

  constructor() {
    super()
    this.state = {
      createForm: {
        nombre: { error: false, mensaje: '' },
        email: { error: false, mensaje: '' },
        razonSocial: { error: false, mensaje: '' },
        calle: { error: false, mensaje: '' },
        numero: { error: false, mensaje: '' },
        codigoPostal: { error: false, mensaje: '' },
        email2: { error: false, mensaje: '' },
        pass: { error: false, mensaje: '' },
        pass2: { error: false, mensaje: '' },
        tipoComercio: { seleccionado: -1, error: false, mensaje: '' }
      }
    }
    this.updateTipoComercioSelect = this.updateTipoComercioSelect.bind(this)
    this.abrirModal = this.abrirModal.bind(this)
  }

  resetCreateForm() {
    let createForm = {
      nombre: { error: false, mensaje: '' },
      email: { error: false, mensaje: '' },
      razonSocial: { error: false, mensaje: '' },
      calle: { error: false, mensaje: '' },
      numero: { error: false, mensaje: '' },
      codigoPostal: { error: false, mensaje: '' },
      email2: { error: false, mensaje: '' },
      pass: { error: false, mensaje: '' },
      pass2: { error: false, mensaje: '' },
      tipoComercio: { seleccionado: -1, error: false, mensaje: '' }
    }
    this.setState({ ...this.state, createForm: createForm })
  }

  validarCreateForm(nombre, razonSocial, calle, numero, codigoPostal, email, email2, pass, pass2) {
    let formOk = true

    let createForm = {
      nombre: { error: false, mensaje: '' },
      email: { error: false, mensaje: '' },
      razonSocial: { error: false, mensaje: '' },
      calle: { error: false, mensaje: '' },
      numero: { error: false, mensaje: '' },
      codigoPostal: { error: false, mensaje: '' },
      email2: { error: false, mensaje: '' },
      pass: { error: false, mensaje: '' },
      pass2: { error: false, mensaje: '' },
      tipoComercio: { seleccionado: this.state.createForm.tipoComercio.seleccionado, error: false, mensaje: '' }
    }

    if (nombre == null || nombre == '') {
      createForm.nombre.error = true
      createForm.nombre.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.nombre.error = false
      createForm.nombre.mensaje = ''
    }

    if (razonSocial == null || razonSocial == '') {
      createForm.razonSocial.error = true
      createForm.razonSocial.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.razonSocial.error = false
      createForm.razonSocial.mensaje = ''
    }

    if (calle == null || calle == '') {
      createForm.calle.error = true
      createForm.calle.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.calle.error = false
      createForm.calle.mensaje = ''
    }

    if (numero == null || numero == '') {
      createForm.numero.error = true
      createForm.numero.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.numero.error = false
      createForm.numero.mensaje = ''
    }

    if (codigoPostal == null || codigoPostal == '') {
      createForm.codigoPostal.error = true
      createForm.codigoPostal.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.codigoPostal.error = false
      createForm.codigoPostal.mensaje = ''
    }

    if (this.state.createForm.tipoComercio.seleccionado <= 0) {
      createForm.tipoComercio.error = true
      createForm.tipoComercio.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.tipoComercio.error = false
      createForm.tipoComercio.mensaje = ''
    }

    if (email == null || email == '') {
      createForm.email.error = true
      createForm.email.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.email.error = false
      createForm.email.mensaje = ''
    }

    if (email2 == null || email2 == '') {
      createForm.email2.error = true
      createForm.email2.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.email2.error = false
      createForm.email2.mensaje = ''
    }

    if (formOk && email != email2) {
      createForm.email2.error = true
      createForm.email2.mensaje = 'Los emails no coinciden'
      formOk = false
    } else if (formOk) {
      createForm.email2.error = false
      createForm.email2.mensaje = ''
    }

    if (pass == null || pass == '') {
      createForm.pass.error = true
      createForm.pass.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.pass.error = false
      createForm.pass.mensaje = ''
    }

    if (pass2 == null || pass2 == '') {
      createForm.pass2.error = true
      createForm.pass2.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      createForm.pass2.error = false
      createForm.pass2.mensaje = ''
    }

    if (formOk && pass != pass2) {
      createForm.pass2.error = true
      createForm.pass2.mensaje = 'Las contraseñas no coinciden'
      formOk = false
    } else if (formOk) {
      createForm.pass2.error = false
      createForm.pass2.mensaje = ''
    }

    this.setState({ ...this.state, createForm: createForm })

    return formOk
  }

  abrirModal() {
    this.resetCreateForm()
    this.modal.showModal()
  }

  getTipoComercios() {
    return getTipoComerciosSelectOptions(this.props.allTipoComercios, true)
  }

  updateTipoComercioSelect(newValue) {
    let newCreateForm = { ...this.state.createForm }
    newCreateForm.tipoComercio.seleccionado = (newValue != null) ? newValue.value : -1
    this.setState({
      ...this.state,
      createForm: newCreateForm
    })
  }

  getCrearModalBody() {
    let body = []
    body.push(<Row key={'formCreateRow1'}>
      <Col lg={6}>
        <CustomFormField key="nombreGroup" validationState={this.state.createForm.nombre.error ? 'error' : null}
          validationMessage={this.state.createForm.nombre.mensaje} bsSize="small" controlId="nombreInput"
          label="Nombre" inputComponent={
            <FormControl ref={nombreInput => { this.nombreInput = nombreInput }} key="nombreInput" bsSize="small"
              type="text" placeholder="ingresá un nombre"></FormControl>}
        />
      </Col>
      <Col lg={6}>
        <CustomFormField key="tipoComercioGroup" validationState={this.state.createForm.tipoComercio.error ? 'error' : null}
          bsSize="small" controlId="tipoComercioSelect" validationMessage={this.state.createForm.tipoComercio.mensaje}
          label="Tipo Comercio" inputComponent={
            <Select key="tipoComercioSelect" value={this.state.createForm.tipoComercio.seleccionado}
              options={this.getTipoComercios()} id="tipoComercioSelect" onChange={this.updateTipoComercioSelect}
              placeholder="seleccioná un tipo de comercio" name="tipoComercioSelect" />
          } />
      </Col>
    </Row>)
    body.push(<Row key={'formCreateRow2'}>
      <Col lg={12}>
        <CustomFormField key="razonSocialGroup" validationState={this.state.createForm.razonSocial.error ? 'error' : null}
          validationMessage={this.state.createForm.razonSocial.mensaje} bsSize="small" controlId="razonSocialInput"
          label="Razón Social" inputComponent={
            <FormControl ref={razonSocialInput => { this.razonSocialInput = razonSocialInput }} key="razonSocialInput" bsSize="small"
              type="text" placeholder="ingresá la razón social del comercio"></FormControl>}
        />
      </Col>
    </Row>)
    body.push(<Row key={'formCreateRow3'}>
      <Col lg={6}>
        <CustomFormField key="calleGroup" validationState={this.state.createForm.calle.error ? 'error' : null}
          validationMessage={this.state.createForm.calle.mensaje} bsSize="small" controlId="verificarCalleInput"
          label="Calle" inputComponent={
            <FormControl ref={verificarCalleInput => { this.verificarCalleInput = verificarCalleInput }}
              bsSize="small" type="text" placeholder="ingresá la calle" key="verificarCalleInput"></FormControl>}
        />
      </Col>
      <Col lg={3}>
        <CustomFormField key="numeroGroup" validationState={this.state.createForm.numero.error ? 'error' : null}
          validationMessage={this.state.createForm.numero.mensaje} bsSize="small" controlId="numeroInput"
          label="Número" inputComponent={
            <FormControl ref={numeroInput => { this.numeroInput = numeroInput }} key="numeroInput" bsSize="small"
              type="text" placeholder="ingresá número"></FormControl>}
        />
      </Col>
      <Col lg={3}>
        <CustomFormField key="codigoPostalGroup" validationState={this.state.createForm.codigoPostal.error ? 'error' : null}
          validationMessage={this.state.createForm.codigoPostal.mensaje} bsSize="small" controlId="codigoPostalInput"
          label="Código postal" inputComponent={
            <FormControl ref={codigoPostalInput => { this.codigoPostalInput = codigoPostalInput }} key="codigoPostalInput" bsSize="small"
              type="text" placeholder="ingresá cp"></FormControl>}
        />
      </Col>
    </Row>)
    body.push(<Row key={'formCreateRow4'}>
      <Col lg={6}>
        <CustomFormField key="emailGroup" validationState={this.state.createForm.email.error ? 'error' : null}
          validationMessage={this.state.createForm.email.mensaje} bsSize="small" controlId="emailInput"
          label="Email" inputComponent={
            <FormControl ref={emailInput => { this.emailInput = emailInput }} key="emailInput" bsSize="small"
              type="text" placeholder="ingresá una dirección de email"></FormControl>}
        />
      </Col>
      <Col lg={6}>
        <CustomFormField key="verificarEmailGroup" validationState={this.state.createForm.email2.error ? 'error' : null}
          validationMessage={this.state.createForm.email2.mensaje} bsSize="small" controlId="verificarEmailInput"
          label="Verificar email" inputComponent={
            <FormControl ref={verificarEmailInput => { this.verificarEmailInput = verificarEmailInput }}
              bsSize="small" type="text" placeholder="verificá el email" key="verificarEmailInput"></FormControl>}
        />
      </Col>
    </Row>)
    body.push(<Row key={'formCreateRow5'}>
      <Col lg={6}>
        <CustomFormField key="passGroup" validationState={this.state.createForm.pass.error ? 'error' : null}
          validationMessage={this.state.createForm.pass.mensaje} bsSize="small" controlId="passInput"
          label="Contraseña" inputComponent={
            <FormControl ref={passInput => { this.passInput = passInput }}
              bsSize="small" type="password" placeholder="ingresá una contraseña" key="passInput"></FormControl>}
        />
      </Col>
      <Col lg={6}>
        <CustomFormField key="pass2Group" validationState={this.state.createForm.pass2.error ? 'error' : null}
          validationMessage={this.state.createForm.pass2.mensaje} bsSize="small" controlId="pass2Input"
          label="Verificar contraseña" inputComponent={
            <FormControl ref={passInput2 => { this.passInput2 = passInput2 }}
              bsSize="small" type="password" placeholder="verificá la contraseña" key="pass2Input"></FormControl>}
        />
      </Col>
    </Row>)
    return body
  }

  getCrearModalButtons() {
    let buttons = []
    buttons.push(<Button key={'createComercioButton'} bsSize={'small'} bsStyle={'primary'} onClick={() => {
      let nombre = ReactDOM.findDOMNode(this.nombreInput).value
      let razonSocial = ReactDOM.findDOMNode(this.nombreInput).value
      let calle = ReactDOM.findDOMNode(this.nombreInput).value
      let numero = ReactDOM.findDOMNode(this.nombreInput).value
      let codigoPostal = ReactDOM.findDOMNode(this.nombreInput).value
      let email = ReactDOM.findDOMNode(this.emailInput).value
      let email2 = ReactDOM.findDOMNode(this.verificarEmailInput).value
      let pass = ReactDOM.findDOMNode(this.passInput).value
      let pass2 = ReactDOM.findDOMNode(this.passInput2).value

      if (this.validarCreateForm(nombre, razonSocial, calle, numero, codigoPostal, email, email2, pass, pass2)) {
        this.props.createComercio(nombre, razonSocial, calle, numero, codigoPostal, email, email2, this.state.createForm.tipoComercio.seleccionado, pass, pass2)
        this.modal.hideModal()
      }
    }}>Guardar</Button>)

    return buttons
  }

  render() {
    return (
      <CustomModal key={'nuevoComercioModal'} title={'Nuevo comercio'} body={this.getCrearModalBody()}
        buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
    )
  }
}

const mapDispatch = (dispatch) => ({
  createComercio: (nombreComercio, razonSocial, calle, numero, codigoPostal, email, verificarEmail, tipoComercio, password, confirmacionPassword) => {
    dispatch(createComercio(nombreComercio, razonSocial, calle, numero, codigoPostal, email, verificarEmail, tipoComercio, password, confirmacionPassword))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(CrearComercioModal)