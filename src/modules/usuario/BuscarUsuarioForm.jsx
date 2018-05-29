import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Row, Col, Button, FormControl } from 'react-bootstrap'
import { CustomFormField } from '../../utils/CustomFormField'
import { withRouter } from 'react-router-dom'
import { getUsuarios } from './usuarioReducer'
import { getTipoUsuariosSelectOptions } from '../../utils/utils'

export class BuscarUsuarioForm extends React.Component {

  constructor() {
    super()
    this.state = {
      estadoFiltro: '-1'
    }
    this.updateTipoUsuarioSearch = this.updateTipoUsuarioSearch.bind(this)
    this.updateEstadoSearch = this.updateEstadoSearch.bind(this)
  }

  getTipoUsuariosSearch() {
    return getTipoUsuariosSelectOptions(this.props.allTipoUsuarios)
  }

  updateTipoUsuarioSearch (newValue) {
    this.setState({
      ...this.state, 
      tipoUsuarioFiltro: (newValue != null) ? newValue.value : -1
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
        let estadoSearch = this.state.estadoFiltro
        this.props.usuarios(nombreSearch, estadoSearch)
      }}>
        <Row>
          <Col lg={4}>
            <CustomFormField key="nombreSearch" bsSize="small" controlId="nombreSearch" label="Nombre" inputComponent={
              <FormControl ref={nombreSearch => { this.nombreSearch = nombreSearch }} key="nombreSearchControl" 
                bsSize="small" type="text"></FormControl>
            }/>
          </Col>
          <Col lg={2}>
            <CustomFormField key="estadoSearch" bsSize="small" controlId="estadoSearch" label="Estado" 
              inputComponent={
                <Select name="estadoSelect" value={this.state.estadoFiltro}
                  options={[{ value: 'habilitado', label: 'habilitado' },{ value: 'deshabilitado', label: 'deshabilitado'}]} id="estadoSearch" 
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
  usuarios: (nombre, estado) => {
    dispatch(getUsuarios(nombre, estado))
  }
})

export default withRouter(connect(null, mapDispatch)(BuscarUsuarioForm))