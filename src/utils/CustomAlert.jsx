import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Alert, Col, Row } from 'react-bootstrap'

export class CustomAlert extends React.Component {
  render() {
    return (
      <Row key={this.props.rowKey}> 
        <Col lg={12}>
          <Alert onDismiss={this.props.onDismiss} bsStyle={this.props.bsStyle}><p>{this.props.message}</p></Alert>
        </Col>
      </Row>
    )
  }
  
}

const componentWillUnmount = () =>{
  this.setState({
    ...this.state,
    alert: {}
  })
}

export default withRouter(connect(componentWillUnmount)(CustomAlert))