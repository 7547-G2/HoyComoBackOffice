import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { updateComercio } from './comercioReducer'
import { getTipoComerciosSelectOptions, validFileSize, validFileType } from '../../utils/utils'
import Select from 'react-select'
import { Row, Col, FormControl, Panel, Image, FormGroup, HelpBlock } from 'react-bootstrap'
import { CustomFormField } from '../../utils/CustomFormField'
import EditarPlatosTable from './EditarPlatosTable'

import Img1 from '../../utils/images/ImageLogoDefault.png'

export class EditarComercioForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageValue: null,
      imageLogo: this.props.activeComercio.imagenLogo || Img1,
      lastImageLogo: this.props.activeComercio.imagenLogo || Img1,
      ready: false,
      updateForm: {
        nombre: { error: false, mensaje: '' },
        razonSocial: { error: false, mensaje: '' },
        numero: { error: false, mensaje: '' },
        codigoPostal: { error: false, mensaje: '' },
        calle: { error: false, mensaje: '' },
        email: { error: false, mensaje: '' },
        imageLogo: { estado: null, mensaje: 'Puede subir imagenes cuadradas de extensión jpg, jpeg, bmp o png' },
        estado: { seleccionado: props.activeComercio.estado, error: false, mensaje: '' },
        tipoComercio: { seleccionado: props.activeComercio.tipoComercio, error: false, mensaje: '' }
      }
    }
    this.onImgLoad = this.onImgLoad.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.updateEstadoSelect = this.updateEstadoSelect.bind(this)
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
      imageLogo: { estado: null, mensaje: 'Puede subir imagenes cuadradas de extensión jpg, jpeg, bmp o png'},
      estado: { error: false, mensaje: '', seleccionado: this.state.estado.seleccionado },
      tipoComercio: { error: false, mensaje: '', seleccionado: this.state.tipoComercio.seleccionado },
    }
    this.setState({ ...this.state, updateForm: updateForm })
  }

  validarUpdateForm(nombre, razonSocial, numero, codigoPostal, calle, email) {
    let formOk = true

    let updateForm = {
      nombre: { error: false, mensaje: '' },
      razonSocial: { error: false, mensaje: '' },
      numero: { error: false, mensaje: '' },
      codigoPostal: { error: false, mensaje: '' },
      calle: { error: false, mensaje: '' },
      email: { error: false, mensaje: '' },
      estado: this.state.updateForm.estado,
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

    if (this.state.updateForm.estado.seleccionado == '') {
      updateForm.estado.error = true
      updateForm.estado.mensaje = 'Este campo es obligatorio'
      formOk = false
    } else {
      updateForm.estado.error = false
      updateForm.estado.mensaje = ''
    }

    if (this.state.updateForm.tipoComercio.seleccionado == '') {
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

  updateTipoComercioSelect(newValue) {
    let newUpdateForm = { ...this.state.updateForm }
    newUpdateForm.tipoComercio.seleccionado = (newValue != null) ? newValue.value : ''
    this.setState({
      ...this.state,
      updateForm: newUpdateForm
    })
  }

  updateEstadoSelect(newValue) {
    let newUpdateForm = { ...this.state.updateForm }
    newUpdateForm.estado.seleccionado = (newValue != null) ? newValue.value : ''
    this.setState({
      ...this.state,
      updateForm: newUpdateForm
    })
  }
  

  editarComercioSubmit() {
    if (this.validarUpdateForm(
      ReactDOM.findDOMNode(this.nombreInput).value,
      ReactDOM.findDOMNode(this.razonSocialInput).value,
      ReactDOM.findDOMNode(this.numeroInput).value,
      ReactDOM.findDOMNode(this.codigoPostalInput).value,
      ReactDOM.findDOMNode(this.calleInput).value,
      ReactDOM.findDOMNode(this.emailInput).value)) {
      this.props.updateComercio(
        this.props.activeComercio.id,
        ReactDOM.findDOMNode(this.razonSocialInput).value,
        ReactDOM.findDOMNode(this.nombreInput).value,
        ReactDOM.findDOMNode(this.numeroInput).value,
        ReactDOM.findDOMNode(this.codigoPostalInput).value,
        ReactDOM.findDOMNode(this.calleInput).value,
        ReactDOM.findDOMNode(this.emailInput).value,
        this.state.updateForm.estado.seleccionado,
        this.state.updateForm.tipoComercio.seleccionado
      )
    }
  }

  onImgLoad({target:img}) {
    if(img.naturalHeight != img.naturalWidth){
      let updateForm = this.state.updateForm
      updateForm.imageLogo.estado = 'error'
      updateForm.imageLogo.mensaje = 'El imagen debe ser cuadrada'
      this.setState({
        ...this.state,
        updateForm: updateForm,
        imageLogo: this.state.lastImageLogo
      })
    }
  }

  handleImageChange(e) {
    e.preventDefault()
    let file = e.target.files[0]
    if (validFileType(file)) {
      if (validFileSize(file)) {
        let lastImageLogo = this.state.imageLogo
        let updateForm = this.state.updateForm
        updateForm.imageLogo.estado = 'success'
        updateForm.imageLogo.mensaje = 'Se ha subido corectamente'
        this.setState({
          ...this.state,
          file: file,
          imageLogo: window.URL.createObjectURL(file),
          lastImageLogo: lastImageLogo,
          updateForm: updateForm
        })
      } else {
        let updateForm = this.state.updateForm
        updateForm.imageLogo.estado = 'error'
        updateForm.imageLogo.mensaje = 'El tamaño del archivo es mayor a 2MB'
        this.setState({ ...this.state, updateForm: updateForm, imageValue:null })
      }
    } else {
      let updateForm = this.state.updateForm
      updateForm.imageLogo.estado = 'error'
      updateForm.imageLogo.mensaje = 'La extesión del archivo es incorrecta'
      this.setState({ ...this.state, updateForm: updateForm, imageValue:null })
    }
  }

  render() {
    return (
      <form>
        <Row>
          <Col lg={4} md={4}>
            <CustomFormField validationState={this.state.updateForm.nombre.error ? 'error' : null}
              validationMessage={this.state.updateForm.nombre.mensaje} bsSize="small" controlId="nombre"
              label="Nombre" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.nombre} key="nombreInput" bsSize="small"
                  ref={nombreInput => { this.nombreInput = nombreInput }} type="text"></FormControl>
              } />
          </Col>
          <Col lg={4} md={4}>
            <CustomFormField validationState={this.state.updateForm.calle.error ? 'error' : null}
              validationMessage={this.state.updateForm.calle.mensaje} bsSize="small" controlId="calle"
              label="Calle" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.calle} key="calleInput" bsSize="small"
                  ref={calleInput => { this.calleInput = calleInput }} type="text"></FormControl>
              } />
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField validationState={this.state.updateForm.numero.error ? 'error' : null}
              validationMessage={this.state.updateForm.numero.mensaje} bsSize="small" controlId="numero"
              label="Numero" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.numero} key="numeroInput" bsSize="small"
                  ref={numeroInput => { this.numeroInput = numeroInput }} type="text"></FormControl>
              } />
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField validationState={this.state.updateForm.codigoPostal.error ? 'error' : null}
              validationMessage={this.state.updateForm.codigoPostal.mensaje} bsSize="small" controlId="codigoPostal"
              label="Código Postal" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.codigoPostal} key="codigoPostalInput" bsSize="small"
                  ref={codigoPostalInput => { this.codigoPostalInput = codigoPostalInput }} type="text"></FormControl>
              } />
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={4}>
            <CustomFormField validationState={this.state.updateForm.razonSocial.error ? 'error' : null}
              validationMessage={this.state.updateForm.razonSocial.mensaje} bsSize="small" controlId="razonSocial"
              label="Razón Social" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.razonSocial} key="razonSocialInput" bsSize="small"
                  ref={razonSocialInput => { this.razonSocialInput = razonSocialInput }} type="text"></FormControl>
              } />
          </Col>
          <Col lg={4} md={4}>
            <CustomFormField validationState={this.state.updateForm.email.error ? 'error' : null}
              validationMessage={this.state.updateForm.email.mensaje} bsSize="small" controlId="email"
              label="Email" inputComponent={
                <FormControl defaultValue={this.props.activeComercio.email} key="emailInput" bsSize="small"
                  ref={emailInput => { this.emailInput = emailInput }} type="text"></FormControl>
              } />
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField validationState={this.state.updateForm.tipoComercio.error ? 'error' : null}
              validationMessage={this.state.updateForm.tipoComercio.mensaje} bsSize="small" controlId="tipoComercioSelect" label="Tipo comercio"
              inputComponent={
                <Select name="tipoComercioSelect" value={this.state.updateForm.tipoComercio.seleccionado}
                  options={getTipoComerciosSelectOptions(this.props.allTipoComercios, true)} id="tipoComercioSelect"
                  key="tipoComercioSelect" onChange={this.updateTipoComercioSelect} placeholder="Seleccioná un tipo comerico" />
              } />
          </Col>
          <Col lg={2} md={2}>
            <CustomFormField validationState={this.state.updateForm.estado.error ? 'error' : null}
              validationMessage={this.state.updateForm.estado.mensaje} bsSize="small" controlId="estadoSelect"
              label="Estado" inputComponent={
                <Select name="estadoSelect" value={this.state.updateForm.estado.seleccionado}
                  options={[
                    { value: 'pendiente menu', label: 'pendiente menu' }, 
                    { value: 'pendiente activacion', label: 'pendiente activacion' },
                    { value: 'activado', label: 'activado' },
                    { value: 'desactivado', label: 'desactivado' }
                  ]} id="estadoSelect"
                  key="estadoSelect" onChange={this.updateEstadoSelect} placeholder="Selecciona" />
              } />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  Logo comercio
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <FormGroup validationState={this.state.updateForm.imageLogo.estado}
                  controlId={'formControlsFile'} >
                  <Image src={this.state.imageLogo} style={{ width: 100, height: 100 }}
                    onLoad={this.onImgLoad}
                    rounded responsive />
                  <br></br>
                  <FormControl 
                    onChange={this.handleImageChange}
                    value={this.imageValue}
                    type={'file'} accept={['.jpg', '.jpeg', '.bmp', '.png']} />
                  <HelpBlock>{this.state.updateForm.imageLogo.mensaje}</HelpBlock>
                </FormGroup>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <br></br>
        <EditarPlatosTable />  
        <br></br>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => ({
  updateComercio: (idComercio,
    nombre,
    razonSocial,
    numero,
    codigoPostal,
    calle,
    email,
    estado,
    tipoComercio) => {
    let imagenLogo = ''
    // if(this.state.imageLogo && this.state.imageLogo != Img1){
    //   imagenLogo = ''
    // }
    dispatch(updateComercio(idComercio,
      nombre,
      razonSocial,
      numero,
      codigoPostal,
      calle,
      email,
      estado,
      tipoComercio,
      imagenLogo))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(EditarComercioForm)