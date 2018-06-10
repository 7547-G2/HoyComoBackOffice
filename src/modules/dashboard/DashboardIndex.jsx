import React from 'react'
import { connect } from 'react-redux'
import 'react-vis/dist/style.css'
import { Row, Col, Button, Glyphicon, Panel, Label } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getDashboard, resetDashboard, clearAlert } from './dashboardReducer'
import { CustomAlert } from '../../utils/CustomAlert'
import moment from 'moment'

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis'


export class DashboardIndex extends React.Component {
  constructor() {
    super()
    this.state = { crosshairValues: [], w: null, z: null}
    this.recargar = this.recargar.bind(this)
    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._onNearestX1 = this._onNearestX1.bind(this)
    this._onNearestX2 = this._onNearestX2.bind(this)
    this.w
    this.z
  }

  componentDidMount() {
    this.props.clearResult()
  }

  recargar() {
    this.props.getDashboard()
  }

  _onMouseLeave() {
    this.setState({ crosshairValues: [], w: null, z: null })
  }

  _onNearestX2(value) {
    let w = value.x
    let z = value.y
    this.setState({ w: w, z: z})
  }

  _onNearestX1(value) {
    console.log(value)
    let x = value.x
    let y = value.y
    this.setState({...this.state, crosshairValues: [{ x: x, y: y}] })
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
        <Row><br /></Row>
        <Row>
          <Col lg={6}>
            <Panel >
              <Panel.Heading style={{ textAlign: 'center', backgroundColor: '#3f51b5', borderColor: '#3a46b0', color: 'white', height: 45 }}>
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Habilitados
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Deshabilitados
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}>
                <Col lg={6} style={{ textAlign: 'center', color: '#449d44', fontSize: 100, padding: '0px', margin: '0px', lineHeight: '0.7' }}>
                  <b>{this.props.comercios.habilitados}</b>
                </Col>
                <Col lg={6} style={{ textAlign: 'center', color: '#d9534f', fontSize: 100, padding: '0px', margin: '0px', lineHeight: '0.7' }}>
                  <b>{this.props.comercios.deshabilitados}</b>
                </Col>
              </Panel.Body>
              <Panel.Footer style={{ backgroundColor: '#3a46b0', borderColor: '#3a46b0', color: 'white', fontSize: 15 }}>
                <b><Glyphicon glyph="home" /> CANTIDAD DE COMERCIOS</b>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col lg={6}>
            <Panel >
              <Panel.Heading style={{ textAlign: 'center', backgroundColor: '#3f51b5', borderColor: '#3a46b0', color: 'white', height: 45 }}>
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Habilidatos
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Deshabilitados
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}>
                <Col lg={6} style={{ textAlign: 'center', color: '#449d44', fontSize: 100, padding: '0px', margin: '0px', lineHeight: '0.7' }}>
                  <b>{this.props.usuarios.habilitados}</b>
                </Col>
                <Col lg={6} style={{ textAlign: 'center', color: '#d9534f', fontSize: 100, padding: '0px', margin: '0px', lineHeight: '0.7' }}>
                  <b>{this.props.usuarios.habilitados}</b>
                </Col>
              </Panel.Body>
              <Panel.Footer style={{ backgroundColor: '#3a46b0', borderColor: '#3a46b0', color: 'white', fontSize: 15 }}>
                <b><Glyphicon glyph="user" />  CANTIDAD DE USUARIOS</b>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Panel style={{ backgroundColor: '#FFFFFF', borderColor: '#3a46b0' }}>
              <Panel.Body>
                <Col lg={12}>
                  <FlexibleWidthXYPlot
                    onMouseLeave={this._onMouseLeave}
                    xType="time"
                    height={300}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="Hora" position="start" />
                    <YAxis title="Requests" />
                    <LineSeries
                      id="primeros"
                      name="primeros"
                      stroke="#449d44"
                      onNearestX={this._onNearestX1}
                      className="first-series"
                      data={this.props.pedidos.entregados} />
                    <LineSeries
                      id="segundos"
                      name="segundos"
                      stroke="#d9534f"
                      onNearestX={this._onNearestX2}
                      className="first-series"
                      data={this.props.pedidos.cancelados} />
                    <Crosshair values={this.state.crosshairValues}>
                      <div >
                        {this.state.crosshairValues.length > 0 &&
                          <h4>
                            <Label>{moment(this.state.crosshairValues[0].x).format('HH:mm') + 'hs'}: {this.state.crosshairValues[0].y} entregados - {this.state.z} cancelados</Label>
                          </h4>
                        }
                      </div>
                    </Crosshair >
                  </FlexibleWidthXYPlot >
                </Col>
              </Panel.Body>
              <Panel.Footer style={{ backgroundColor: '#3a46b0', borderColor: '#3a46b0', color: 'white', fontSize: 15 }}>
                <b><Glyphicon glyph="user" />  PEDIDOS TOTALES EN LOS ÚLTIMOS 30 DIAS</b>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getDashboard: () => {
    dispatch(getDashboard())
  },
  clearResult: () => {
    dispatch(resetDashboard())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  },
})

const mapStateToProps = (state) => {
  return {
    alert: state.dashboardReducer.alert,
    usuarios: state.dashboardReducer.dashboardUsuarios,
    comercios: state.dashboardReducer.dashboardComercios,
    pedidos: state.dashboardReducer.dashboardPedidos,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(DashboardIndex))
