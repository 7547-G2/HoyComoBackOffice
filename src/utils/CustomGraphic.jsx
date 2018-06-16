import React from 'react'
import 'react-vis/dist/style.css'
import moment from 'moment'
import { Label } from 'react-bootstrap'
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis'

export class CustomGraphic extends React.Component {

  constructor() {
    super()
    this.state = { crosshairValues: [], w: null, z: null}
    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._onNearestX1 = this._onNearestX1.bind(this)
    this._onNearestX2 = this._onNearestX2.bind(this)
  }

  showModal() {
    this.setState({ show: true })
  }

  hideModal() {
    this.setState({ show: false })
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
    let x = value.x
    let y = value.y
    this.setState({...this.state, crosshairValues: [{ x: x, y: y}] })
  }

  render() {
    return (
      <FlexibleWidthXYPlot
        onMouseLeave={this._onMouseLeave}
        xType="time" 
        height={200}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Día" position="start" />
        <YAxis title={this.props.YAxis} />
        <LineSeries
          id="primeros"
          name="primeros"
          stroke="#449d44"
          onNearestX={this._onNearestX1}
          className="first-series"
          data={this.props.pedidos.entregados} />
        {/* <LineSeries
          id="segundos"
          name="segundos"
          stroke="#d9534f"
          onNearestX={this._onNearestX2}
          className="first-series"
          data={this.props.pedidos.cancelados} /> */}
        <Crosshair values={this.state.crosshairValues}>
          <div >
            {this.state.crosshairValues.length > 0 &&
              <h4>
                <Label>{moment(this.state.crosshairValues[0].x).format('YYYY/MM/DD')}: {this.props.desc2}{this.state.crosshairValues[0].y} {this.props.desc1} 
                  {/* - {this.state.z} {this.props.desc2} */}
                </Label>
              </h4>
            }
          </div>
        </Crosshair >
      </FlexibleWidthXYPlot >
    )
  }
}
