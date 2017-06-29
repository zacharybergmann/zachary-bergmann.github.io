import React from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

const Navigation = () => (
  <Navbar fluid staticTop inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Zachary Bergmann</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <IndexLinkContainer to='/'><NavItem>Home</NavItem></IndexLinkContainer>
        <LinkContainer to='/blog'><NavItem>Blog</NavItem></LinkContainer>
        <NavDropdown pullRight eventKey={3} title="Applications" id="basic-nav-dropdown">
          <MenuItem href="http://bargainhound.zacharybergmann.com">Bargain Hound</MenuItem>
          <MenuItem href="http://spork.zacharybergmann.com">Spork</MenuItem>
          <MenuItem href="http://pickup.zacharybergmann.com">PickUp</MenuItem>
          <MenuItem href="http://langsnap.zacharybergmann.com">LangSnap</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
