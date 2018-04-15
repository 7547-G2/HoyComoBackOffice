import React from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { CustomTable } from '../../utils/CustomTable'
import history from '../../history'

export class EditarPlatosTable extends React.Component {

  // editarAction(id) {
  //   history.push('/comercios/' + id)
  // }

  getTablaPlatos() {
    if (this.props.activePlatos && this.props.activePlatos.length != 0) {
      return <CustomTable data={this.props.activePlatos} 
        headers={['Imagen', 'Nombre', 'Precio']}
        // editAction={this.editarAction} 
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