import React from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { CustomTableWithImageAndPagination } from '../../utils/CustomTableWithImageAndPagination'

export class EditarPlatosTable extends React.Component {

  // editarAction(id) {
  //   history.push('/comercios/' + id)
  // }

  getTablaPlatos() {
    if (this.props.activeComercio.platos && this.props.activeComercio.platos.length != 0) {
      return <CustomTableWithImageAndPagination data={this.props.activeComercio.platos} 
        headers={['Imagen','Nombre', 'Precio']}
      />
    } else {
      return <Alert bsStyle="info">No se encontraron platos para este comercio</Alert>
    }
  }

  render() {
    return (
      <div>
        {this.getTablaPlatos()}
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

export default withRouter(connect(mapStateToProps, null)(EditarPlatosTable))