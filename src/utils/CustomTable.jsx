import React from 'react'
import { Grid, FormGroup, FormControl, ControlLabel, Table, Glyphicon } from 'react-bootstrap'

export class CustomTable extends React.Component {

  getHeaders() {
    let headers = this.props.headers, i, returnHeaders = [], editAction = this.props.editAction, deleteAction = this.props.deleteAction, activeAction = this.props.activeAction

    for (i in headers) {
      returnHeaders.push(
        <th key={i}>
          {headers[i]}
        </th>
      )
    }
    if (editAction || deleteAction || activeAction) {
      returnHeaders.push(<th key={'acciones'}></th>)
    }
    return returnHeaders
  }

  getTableRows() {
    let data = this.props.data, editAction = this.props.editAction, deleteAction = this.props.deleteAction, activeAction = this.props.activeAction
    var tableRow = data.map(function (rowObject) {
      let i
      var returnValue = []

      for (i in rowObject) {
        if (i != 'id' && i != 'habilitado')
          returnValue.push(
            <td key={i}>
              {rowObject[i]}
            </td>)
      }

      if (editAction || deleteAction || activeAction) {
        let editRender, deleteRender, activeRender

        if (editAction) {
          editRender = <a href="javascript:void(0)">
            <i className="fa fa-pencil" title="Editar" onClick={() => editAction(rowObject.id)}></i>
          </a>
        }

        if (deleteAction) {
          deleteRender = <a href="javascript:void(0)" >
            <Glyphicon glyph="eye-close" title="Eliminar" onClick={() => deleteAction(rowObject.id)}/>
          </a>
        }

        if (activeAction) {
          let icon = rowObject.habilitado?'eye-open':'eye-close'
          let title = rowObject.habilitado?'Habilitado':'Deshabilitado'
          activeRender = <a href="javascript:void(0)" >
            <Glyphicon glyph={icon} title={title} onClick={() => activeAction(rowObject.id)}/>
          </a>
        }
        let spaceEditDelete = (editRender && deleteRender)?'  ':''
        let spaceDeleteActive = (deleteRender && activeRender)?'  ':''
        let spaceEditActive = (editRender && activeRender)?'  ':''
        returnValue.push(
          <td key={'acciones'}>
            {editRender}
            {spaceEditDelete}
            {spaceEditActive}
            {deleteRender}
            {spaceDeleteActive}
            {activeRender}
          </td>)
      }

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>)
    })
    return tableRow
  }

  render() {
    return (
      <Table hover striped>
        <thead>
          <tr>
            {this.getHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.getTableRows()}
        </tbody>
      </Table>
    )
  }
}