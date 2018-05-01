import React from 'react'
import { Table, Glyphicon } from 'react-bootstrap'
import Pagination from 'react-js-pagination'

export class CustomTableWithPagination extends React.Component {

  constructor() {
    super()
    this.state = {
      activePage: 1,
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber})
  }

  getHeaders() {
    let headers = this.props.headers, i, returnHeaders = [], editAction = this.props.editAction, deleteAction = this.props.deleteAction
    for (i in headers) {
      returnHeaders.push(
        <th key={i}>
          {headers[i]}
        </th>
      )
    }
    if (editAction || deleteAction ) {
      returnHeaders.push(<th key={'acciones'}></th>)
    }
    return returnHeaders
  }

  getTableRows() {
    let data = this.props.data, editAction = this.props.editAction, deleteAction = this.props.deleteAction
    const perPage = this.props.perPage || 10
    const activePage = this.state.activePage
    data = data.slice((activePage-1)*perPage,(activePage-1)*perPage + perPage)
    var tableRow = data.map(function (rowObject) {
      let i
      var returnValue = []

      for (i in rowObject) {
        if (i != 'id')
          returnValue.push(
            <td key={i}>
              {rowObject[i]}
            </td>)
      }

      if (editAction || deleteAction) {
        let editRender, deleteRender

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

        let spaceEditDelete = (editRender && deleteRender)?'  ':''
        returnValue.push(
          <td key={'acciones'}>
            {editRender}
            {spaceEditDelete}
            {deleteRender}
          </td>)
      }

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>)
    })
    return tableRow
  }

  getPagination() {
    const PER_PAGE = this.props.perPage || 10
    const TOTAL_COUNT = this.props.data.length
    if(TOTAL_COUNT <= PER_PAGE){
      return(null)
    } else {
      return (<Pagination
        firstPageText={<i className='glyphicon glyphicon-chevron-left'/>}
        lastPageText={<i className='glyphicon glyphicon-chevron-right'/>}
        prevPageText={<i className='glyphicon glyphicon-menu-left'/>}
        nextPageText={<i className='glyphicon glyphicon-menu-right'/>}
        activePage={this.state.activePage}
        itemsCountPerPage={PER_PAGE}
        totalItemsCount={TOTAL_COUNT}
        onChange={this.handlePageChange}
      />)
    }
  }

  render() {
    return (
      <div>
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
        {this.getPagination()}
      </div>
    )
  }
}