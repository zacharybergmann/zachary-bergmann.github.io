import React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
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
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
