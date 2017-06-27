import React, { Component } from 'react';
import { Col, Image, Row, Well } from 'react-bootstrap';

class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Well className="container">
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <a href={this.props.project.deployedUrl}><Image src={this.props.project.image} thumbnail /></a>
          </Col>
          <Col>
            <Row>
              <h2>{this.props.project.name}</h2>
              <h4>{this.props.project.description}</h4>
            </Row>
          </Col>
        </Row>
      </Well>
    );
  }  
}

export default Project;
