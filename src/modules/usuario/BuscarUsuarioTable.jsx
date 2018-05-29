import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { CustomTableWithPagination } from '../../utils/CustomTableWithPagination'
import history from '../../history'
import { ordenarPorId } from  '../../utils/utils'

export class BuscarUsuarioTable extends React.Component {

  constructor() {
    super()
  }

  editarAction(id) {
    history.push('/usuarios/' + id)
  }

  getTablaUsuarios() {
    if (this.props.activeSearch && this.props.result.length != 0) {
      // if (permisoEditUsuarios(this.props.permisosUsuario))
      return <CustomTableWithPagination data={ordenarPorId(this.props.result)} headers={['Nombre','Domicilio','Estado']}
        editAction={this.editarAction} />
    } else if (this.props.activeSearch) {
      return <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
    }
  }

  render() {
    return (
      <div>
        {this.getTablaUsuarios()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.usuarioReducer.result,
    activeSearch: state.usuarioReducer.activeSearch,
  }
}

export default withRouter(connect(mapStateToProps, null)(BuscarUsuarioTable))