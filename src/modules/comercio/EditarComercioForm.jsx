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
import ReactFileBase64 from 'react-file-base64'

const mensajeImagenDefault = 'Puede subir imagenes cuadradas de extensión jpg, jpeg, bmp o png'

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
        imageLogo: { estado: null, mensaje: mensajeImagenDefault },
        estado: { seleccionado: props.activeComercio.estado, error: false, mensaje: '' },
        tipoComercio: { seleccionado: props.activeComercio.tipoComercio, error: false, mensaje: '' }
      }
    }
    this.getFiles = this.getFiles.bind(this)
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
      imageLogo: { estado: null, mensaje: mensajeImagenDefault},
      estado: { error: false, mensaje: '', seleccionado: this.state.estado.seleccionado },
      tipoComercio: { error: false, mensaje: '', seleccionado: this.state.tipoComercio.seleccionado },
    }
    this.setState({ ...this.state, updateForm: updateForm,
      imageValue: null,
      imageLogo: this.props.activeComercio.imagenLogo || Img1,
      lastImageLogo: this.props.activeComercio.imagenLogo || Img1
    })
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
      if(this.state.updateForm.estado.seleccionado  == 'habilitado' && this.props.activeComercio.platos && this.props.activeComercio.platos.length < 5) {
        updateForm.estado.error = true
        updateForm.estado.mensaje = 'El comercio debe tener al menos 5 platos cargados para habilitarse'
        formOk = false
      } else {
        updateForm.estado.error = false
        updateForm.estado.mensaje = ''
      }
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
      let imagenLogoGuardada = ''
      if(this.state.imageLogo && this.state.imageLogo != Img1){
        imagenLogoGuardada = this.state.imageLogo
      }
      let pass = this.props.activeComercio.password
      this.props.updateComercio(
        this.props.activeComercio.id,
        ReactDOM.findDOMNode(this.razonSocialInput).value,
        ReactDOM.findDOMNode(this.nombreInput).value,
        ReactDOM.findDOMNode(this.numeroInput).value,
        ReactDOM.findDOMNode(this.codigoPostalInput).value,
        ReactDOM.findDOMNode(this.calleInput).value,
        ReactDOM.findDOMNode(this.emailInput).value,
        this.state.updateForm.estado.seleccionado,
        this.state.updateForm.tipoComercio.seleccionado,
        imagenLogoGuardada,
        pass        
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
        imageLogo: this.state.lastImageLogo,
      })
    } else {
      this.setState({
        ...this.state,
        imageLogoBase64: img.src
      })
    }
  }

  handleImageChange() {
  }

  getFiles(file){  
    let imageLogo = {}
    if (validFileType(file)) {
      if (validFileSize(file)) {
        let lastImageLogo = this.state.imageLogo
        let updateForm = this.state.updateForm
        imageLogo.estado = 'success'
        imageLogo.mensaje = 'Se ha subido corectamente'
        updateForm.imageLogo = imageLogo
        this.setState({
          ...this.state,
          file: file,
          imageLogo: file.base64,
          lastImageLogo: lastImageLogo,
          updateForm: updateForm
        })
      } else {
        let updateForm = this.state.updateForm
        imageLogo.estado = 'error'
        imageLogo.mensaje = 'El tamaño del archivo es mayor a 2MB'
        updateForm.imageLogo = imageLogo
        this.setState({ ...this.state, updateForm: updateForm, imageValue:null })
      }
    } else {
      let updateForm = this.state.updateForm
      imageLogo.estado = 'error'
      imageLogo.mensaje = 'La extesión del archivo es incorrecta'
      updateForm.imageLogo = imageLogo
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
              label="Estado" disabled={true} inputComponent={
                (this.state.updateForm.estado.seleccionado != 'pendiente activacion')?
                  <Select name="estadoSelect" value={this.state.updateForm.estado.seleccionado}
                    options={[
                      // { value: 'pendiente activacion', label: 'pendiente activacion' },
                      { value: 'pendiente menu', label: 'pendiente menu' }, 
                      { value: 'habilitado', label: 'habilitado' },
                      { value: 'deshabilitado', label: 'deshabilitado' }
                    ]} id="estadoSelect"
                    key="estadoSelect" onChange={this.updateEstadoSelect} placeholder="Selecciona" />
                  :<FormControl type="text" disabled={'true'} value={this.state.updateForm.estado.seleccionado} />
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
                <FormGroup validationState={this.state.updateForm.imageLogo ?this.state.updateForm.imageLogo.estado:null}
                  controlId={'formControlsFile'} >
                  <Image id='imagenDeLogo' key='imagenDeLogo' src={this.state.imageLogo} style={{ width: 100, height: 100 }}
                    onLoad={this.onImgLoad}
                    rounded responsive />
                  <br></br>
                  <ReactFileBase64 
                    onDone={this.getFiles}
                    multiple={false}
                    value={this.imageValue}
                    type={'file'} accept={['.jpg', '.jpeg', '.bmp', '.png']} />
                  <HelpBlock>{this.state.updateForm.imageLogo?this.state.updateForm.imageLogo.mensaje:mensajeImagenDefault}</HelpBlock>
                </FormGroup>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <br></br>
        <EditarPlatosTable activeComercio={this.props.activeComercio}/>  
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
    tipoComercio,
    imagenLogo,
    pass) => {
    dispatch(updateComercio(idComercio,
      nombre,
      razonSocial,
      numero,
      codigoPostal,
      calle,
      email,
      estado,
      tipoComercio,
      imagenLogo,
      pass))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(EditarComercioForm)