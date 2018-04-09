import React from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { CustomTable } from '../../utils/CustomTable'
import history from '../../history'

export class BuscarComercioTable extends React.Component {

  editarAction(id) {
    history.push('/comercios/' + id)
  }

  activeAction(id) {
    history.push('/comercios/' + id)
  }

  getTablaComercios() {
    if (this.props.activeSearch && this.props.result.length != 0) {
      // if (permisoEditComercios(this.props.permisosComercio))
      return <CustomTable data={this.props.result} headers={['Nombre', 'Email', 'Tipo De Comercio','Domicilio']}
        editAction={this.editarAction} activeAction={this.activeAction} />
      // else
      //   return <CustomTable data={this.props.result} headers={['Nombre', 'Email', 'Organismo']} />
    } else if (this.props.activeSearch) {
      return <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
    }
  }

  render() {
    return (
      <div>
        {this.getTablaComercios()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.comercioReducer.result,
    activeSearch: state.comercioReducer.activeSearch,
  }
}

export default withRouter(connect(mapStateToProps, null)(BuscarComercioTable))