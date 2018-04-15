import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import imageLogo from '../utils/images/Logo.png'
  
export const Home = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <h2>Bienvenido</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={2}>
        </Col>
        <Col lg={10}>
          <Image src={imageLogo} style={{  }}
            rounded responsive />
        </Col>
      </Row>
    </div>
  )
}