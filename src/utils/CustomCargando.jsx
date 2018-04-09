import React from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
export class CustomCargando extends React.Component {

  render() {
    return (<Row><Col lg={12} className="text-center"><h5><i className="fa fa-spinner fa-lg fa-spin">&nbsp;</i>Cargando</h5></Col></Row>)     
  }
}
