import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Img1 from './upload/1.png'
import Img2 from './upload/2.png'
import Img3 from './upload/3.png'
import Img4 from './upload/4.png'

import history from '../../history'
import { getComercioById, clearAlert } from './comercioReducer'
import { Row, Col, Grid, Button, Panel, Image } from 'react-bootstrap'
import Input from 'react-bootstrap'
import { CustomCargando } from '../../utils/CustomCargando'
import { CustomAlert } from '../../utils/CustomAlert'
// import EditarRolesUsuario from './EditarRolesUsuario'
import CambiarPassModal from './CambiarPassModal'
import EditarComercioForm from './EditarComercioForm'

export class EditarComercio extends React.Component {

  constructor() {
    super()
    this.state = {
      ready: false,
    }
    this.abrirModalCambiarPass = this.abrirModalCambiarPass.bind(this)
    this.submitEditForm = this.submitEditForm.bind(this)
  }

  componentDidMount() {
    this.state.ready = false
    this.props.comercio(this.props.idComercio)

    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.innerHTML =
    '      $(function () {'
    +'        $(\'#upload\').change(() => {'
    +'          var input = this;'
    +'          var url = $(this).val();'
    +'          var ext = url.substring(url.lastIndexOf(\'.\') + 1).toLowerCase();'
    +'          if (input.files && input.files[0] && (ext == \'gif\' || ext == \'png\' || ext == \'jpeg\' || ext == \'jpg\')) {'
    +'            var reader = new FileReader();'
    +'            reader.onload = function (e) {'
    +'              $(\'#img\').attr(\'src\', e.target.result);'
    +'            }'
    +'            reader.readAsDataURL(input.files[0]);'
    +'          }'
    +'          else {'
    +'            $(\'#img\').attr(\'src\', \'/assets/no_preview.png\');'
    +'          }'
    +'        });'
    +'      })'
    this.body.appendChild(s)
  }

  componentWillReceiveProps() {
    this.state.ready = true
  }

  submitEditForm() {
    this.formEdit.wrappedInstance.editarComercioSubmit()
  }

  abrirModalCambiarPass() {
    this.cambiarPassModal.wrappedInstance.abrirModal()
  }

  render() {
    if (this.state.ready) {
      return (
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <h4>Editar comercio</h4>
            </Col>
          </Row>
          {(this.props.alert.text != null) &&
            <CustomAlert onDismiss={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}

          <EditarComercioForm ref={(formEdit) => { this.formEdit = formEdit }} allTipoComercios={this.props.allTipoComercios} /*allRoles={this.props.allRoles}*/ activeComercio={this.props.activeComercio} />
          <Row>
            {/*<Col md={8}>
              <Panel>
                <Panel.Body>
                  <EditarRolesUsuario activeUser={this.props.activeUser} allRoles={this.props.allRoles}/> 
                </Panel.Body>
              </Panel>
            </Col>*/}
            <Col md={4}>
              <CambiarPassModal idComercio={this.props.idComercio} ref={(modal) => { this.cambiarPassModal = modal }} />
              <Button bsStyle="info" bsSize="small" onClick={this.abrirModalCambiarPass}>
                <i className="fa fa-lock"></i> Cambiar Contraseña
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg={6}>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    Logo comercio
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Grid>
                    <Row>
                      <Col md={12}>
                        <Image src={Img1} rounded responsive />
                      </Col>
                    </Row>
                  </Grid>
                  <span class="control-fileupload">
                    <input type="file" id="upload" onchange="readURL(this)" ></input>
                  </span>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg={12}>
              <Button bsStyle="primary" bsSize="small" onClick={this.submitEditForm}>Guardar</Button>&nbsp;
              <Button bsStyle="default" bsSize="small" onClick={history.goBack}>Volver</Button>
            </Col>
          </Row>
        </Grid>
      )
    } else {
      return <CustomCargando />
    }
  }
}

const mapDispatch = (dispatch) => ({
  comercio: (idComercio) => {
    dispatch(getComercioById(idComercio))
  },
  clearAlert: () => {
    dispatch(clearAlert())
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    alert: state.comercioReducer.alert,
    activeComercio: state.comercioReducer.activeComercio,
    idComercio: ownProps.match.params.id,
    allTipoComercios: state.comercioReducer.allTipoComercios,
    // allRoles: state.userReducer.allRoles,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(EditarComercio))