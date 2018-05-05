import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import history from '../../history'
import { getComercioById, clearAlert } from './comercioReducer'
import { Row, Col, Grid, Button } from 'react-bootstrap'
import { CustomCargando } from '../../utils/CustomCargando'
import { CustomAlert } from '../../utils/CustomAlert'
// import EditarRolesUsuario from './EditarRolesUsuario'
import EditarComercioForm from './EditarComercioForm'
import HabilitarComercioModal from './HabilitarComercioModal'

export class EditarComercio extends React.Component {

  constructor() {
    super()
    this.state = {
      ready: false,
    }
    this.abrirModalCambiarPass = this.abrirModalCambiarPass.bind(this)
    this.submitEditForm = this.submitEditForm.bind(this)
    this.abrirModalHabilitarComercio = this.abrirModalHabilitarComercio.bind(this)
    this.habilitar = this.habilitar.bind(this)
  }

  componentDidMount() {
    this.state.ready = false
    this.props.comercio(this.props.idComercio)
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

  habilitar() {
    this.abrirModalHabilitarComercio()
  }

  abrirModalHabilitarComercio() {
    this.HabilitarComercioModal.wrappedInstance.abrirModal()
  }

  render() {
    if (this.state.ready) {
      return (
        <Grid fluid={true}>
          <Row>
            <Col md={2}>
              <h4>Editar comercio</h4>
            </Col>
            <Col md={ (this.props.activeComercio.estado != 'pendiente menu')?10:9 }>
              <h5 className="pull-right"><i> { this.props.activeComercio.mensajeEncabezado }  </i></h5>
            </Col>
            { this.props.activeComercio.estado == 'pendiente menu' && <Col md={1}>
              <Button bsStyle="success" 
                className="pull-right" bsSize="sm"
                onClick={this.habilitar}>Habilitar</Button> 
            </Col> }
          </Row>
          {(this.props.alert.text != null) &&
            <CustomAlert onDismiss={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}

          <EditarComercioForm ref={(formEdit) => { this.formEdit = formEdit }} allTipoComercios={this.props.allTipoComercios} /*allRoles={this.props.allRoles}*/ activeComercio={this.props.activeComercio} />
          <HabilitarComercioModal activeComercio={this.props.activeComercio} ref={(modal) => { this.HabilitarComercioModal = modal }} />
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