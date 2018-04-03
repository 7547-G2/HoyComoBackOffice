import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../modules/login/authReducer'

export class WebNavbar extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={this.props.home}>Inicio</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.isAuthenticated &&
            <div id='navs'>
              <Nav>
                <LinkContainer to={'/comercio'}>
                  <NavItem eventKey={1} href="#">
                    Comercios
                  </NavItem>
                </LinkContainer>
                <NavItem eventKey={2} href="#">
                  Usuarios
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavDropdown title={this.props.email} id="logged-user-dropdown">
                  <MenuItem onClick={this.props.logout}>
                    <i className="fa fa-sign-out"></i>&nbsp;
                    Cerrar sesión
                  </MenuItem>
                </NavDropdown>
              </Nav>
            </div>}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    email: state.authReducer.user.email
  }
}

const mapDispatch = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  },
  home: () => {
    dispatch(push('/'))
  }
})

export default connect(mapStateToProps, mapDispatch)(WebNavbar)