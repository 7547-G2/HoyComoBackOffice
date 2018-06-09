import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getDashboard, clearDashboard, clearAlert } from './dashboardReducer'
import { CustomAlert } from '../../utils/CustomAlert'

export class DashboardIndex extends React.Component {
  constructor() {
    super()
    this.recargar = this.recargar.bind(this)
  }

  componentDidMount() {
    this.props.clearResult()
  }

  recargar() {
    this.props.getDashboard()
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8} lg={8} sm={8} xs={8}>
            <h4>Dashboard</h4>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            <br />
            <Button bsStyle="success" bsSize="xsmall" className="pull-right" onClick={this.recargar}>
              <Glyphicon glyph="repeat" />Recargar
            </Button>
          </Col>
        </Row>
        {(this.props.alert.text != null) &&
          <CustomAlert onDismiss={this.props.clearAlert} clear={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}
 
        {/* <BuscarUsuarioForm />
        <br/>
        <BuscarUsuarioTable habilitar={this.habilitar}  deshabilitar={this.deshabilitar}/>  

        <HabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.HabilitarUsuarioModal = modal }} />
        <DeshabilitarUsuarioModal activeUsuario={this.props.activeUsuario} ref={(modal) => { this.DeshabilitarUsuarioModal = modal }} />  */}
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getDashboard: () => {
    dispatch(getDashboard())
  },
  clearResult: () => {
    dispatch(clearDashboard())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  },
})

const mapStateToProps = (state) => {
  return {
    alert: state.usuarioReducer.alert,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(DashboardIndex))
