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
      tipoComerciosFiltro: '-1',
      estadoFiltro: '-1'
    }
    this.updateTipoComercioSearch = this.updateTipoComercioSearch.bind(this)
    this.updateEstadoSearch = this.updateEstadoSearch.bind(this)
  }

  getTipoComerciosSearch() {
    return getTipoComerciosSelectOptions(this.props.allTipoComercios)
  }

  updateTipoComercioSearch (newValue) {
    this.setState({
      ...this.state, 
      tipoComercioFiltro: (newValue != null) ? newValue.value : -1
    })
  }

  updateEstadoSearch (newValue) {
    this.setState({
      ...this.state, 
      estadoFiltro: (newValue != null) ? newValue.value : -1
    })
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault() // Previene el submit default del form
        let nombreSearch = ReactDOM.findDOMNode(this.nombreSearch).value
        let emailSearch = ReactDOM.findDOMNode(this.emailSearch).value
        let tipoComercioSearch = this.state.tipoComercioFiltro
        let estadoSearch = this.state.estadoFiltro
        this.props.comercios(nombreSearch, emailSearch, tipoComercioSearch, estadoSearch)
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
          <Col lg={2}>
            <CustomFormField key="tipoComercioSearch" bsSize="small" controlId="tipoComercioSearch" label="Tipo Comercio" 
              inputComponent={
                <Select name="tipoComercioSelect" value={this.state.tipoComercioFiltro}
                  options={this.getTipoComerciosSearch(this.props.allTipoComercios)} id="tipoComercioSearch" 
                  key="tipoComercioSearchControl" onChange={this.updateTipoComercioSearch} placeholder="Búsqueda por tipo comercio"/>
              }/>
          </Col>
          <Col lg={2}>
            <CustomFormField key="estadoSearch" bsSize="small" controlId="estadoSearch" label="Estado" 
              inputComponent={
                <Select name="estadoSelect" value={this.state.estadoFiltro}
                  options={[{ value: 'activacion', label: 'pendiente activación' },{ value: 'menu', label: 'pendiente menu' }
                    ,{ value: 'habilitado', label: 'habilitado' },{ value: 'deshabilitado', label: 'deshabilitado'}]} id="estadoSearch" 
                  key="estadoSearchControl" onChange={this.updateEstadoSearch} placeholder="Búsqueda por estado"/>
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
  comercios: (nombre, email, tipoComercio, estado) => {
    dispatch(getComercios(nombre, email, tipoComercio, estado))
  }
})

export default withRouter(connect(null, mapDispatch)(BuscarComercioForm))