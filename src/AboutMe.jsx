import React from 'react';
import { Col, Image, Row, Well } from 'react-bootstrap';

const AboutMe = () => {
  return (
    <div>
      <Row>     
        <Col className="container">
          <Image src='./images/zach_formal.jpg' alt='Zachary Bergmann' rounded />
        </Col>
        <br />
        <Col className="container">
          <br />
          <Well> 
            <h2> About Me </h2>
            <p>
              I am a software engineer in the Baltimore, MD area working primarily on full stack JavaScript applications. 
              When I am not learning something new or building out an app (and consequently learning something new), I enjoy rock climbing,
              hiking/camping, reading, and having social evenings with friends.
            </p>
          </Well>
        </Col>
      </Row>
    </div>
  );
};

export default AboutMe;
