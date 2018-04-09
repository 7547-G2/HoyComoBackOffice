import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Row, Col, Button, FormControl } from 'react-bootstrap'
import { CustomFormField } from '../../utils/CustomFormField'
import { withRouter } from 'react-router-dom'
import { getComercios } from './comercioReducer'
import { getTipoComerciosSelectOptions } from '../../utils/utils'

export class BuscarComercioForm extends React.Component {

  constructor() {
    super()
    this.state = {
      tipoComerciosFiltro: '-1'
    }
    this.updateTipoComercioSearch = this.updateTipoComercioSearch.bind(this)
  }

  getTipoComerciosSearch() {
    return getTipoComerciosSelectOptions(this.props.allTipoComercios,true)
  }

  updateTipoComercioSearch (newValue) {

    this.setState({
      ...this.state, 
      tipoComercioFiltro: (newValue != null) ? newValue.value : -1
    })
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault() // Previene el submit default del form
        let nombreSearch = ReactDOM.findDOMNode(this.nombreSearch).value
        let emailSearch = ReactDOM.findDOMNode(this.emailSearch).value
        let tipoComercioSearch = this.state.tipoComercioFiltro
        this.props.comercios(nombreSearch, emailSearch, tipoComercioSearch)
      }}>
        <Row>
          <Col lg={4}>
            <CustomFormField key="nombreSearch" bsSize="small" controlId="nombreSearch" label="Nombre" inputComponent={
              <FormControl ref={nombreSearch => { this.nombreSearch = nombreSearch }} key="nombreSearchControl" 
                bsSize="small" type="text"></FormControl>
            }/>
          </Col>
          <Col lg={4}>
            <CustomFormField key="emailSearch" bsSize="small" controlId="emailSearch" label="Email" inputComponent={
              <FormControl ref={emailSearch => { this.emailSearch = emailSearch }} key="emailSearchControl" 
                bsSize="small" type="text"></FormControl>
            }/>
          </Col>
          <Col lg={4}>
            <CustomFormField key="tipoComercioSearch" bsSize="small" controlId="tipoComercioSearch" label="Tipo Comercio" 
              inputComponent={
                <Select name="tipoComercioSelect" value={this.state.tipoComercioFiltro}
                  options={this.getTipoComerciosSearch(this.props.allTipoComercios)} id="tipoComercioSearch" 
                  key="tipoComercioSearchControl" onChange={this.updateTipoComercioSearch} placeholder="Búsqueda por tipo comercio"/>
              }/>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <Button bsStyle="primary" bsSize="small" type="submit">
                Buscar
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => ({
  comercios: (nombre, email, tipoComercio) => {
    dispatch(getComercios(nombre, email, tipoComercio))
  }
})

export default withRouter(connect(null, mapDispatch)(BuscarComercioForm))