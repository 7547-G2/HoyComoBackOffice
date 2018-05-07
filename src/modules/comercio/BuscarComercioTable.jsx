import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { CustomTableWithPagination } from '../../utils/CustomTableWithPagination'
import history from '../../history'
import { ordenarPorId } from  '../../utils/utils'

export class BuscarComercioTable extends React.Component {

  constructor() {
    super()
  }

  editarAction(id) {
    history.push('/comercios/' + id)
  }

  getTablaComercios() {
    if (this.props.activeSearch && this.props.result.length != 0) {
      // if (permisoEditComercios(this.props.permisosComercio))
      return <CustomTableWithPagination data={ordenarPorId(this.props.result)} headers={['Nombre', 'Email', 'Tipo De Comercio','Domicilio','Estado']}
        editAction={this.editarAction} />
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