import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Navbar fluid staticTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/">Zachary Bergmann</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem><Link to='/'>Home</Link></NavItem>
            <NavItem><Link to='/blog'>Blog</Link></NavItem>
            <NavItem><Link to='/aboutme'>AboutMe</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
