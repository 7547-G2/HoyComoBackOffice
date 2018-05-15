import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../modules/login/authReducer'
import imageLogo from '../utils/images/Logo.png'

const navbar = {backgroundColor: '#3f51b5', borderColor: '#3f51b5'}
const font = {color: '#ffffff'}

export class WebNavbar extends React.Component {
  render() {
    return (
      <Navbar style={navbar} inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Row>
              <a className="pull-left" href="#">
                <Image src={imageLogo} style={{ width: 45 , height: 30 }}  onClick={this.props.home} rounded responsive  />
              </a>
              <a onClick={this.props.home}> Inicio</a>
            </Row>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.isAuthenticated &&
            <div id='navs'>
              <Nav>
                <LinkContainer to={'/comercios'}>
                  <NavItem style={font}  eventKey={1} href="#">
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