import React from './react';
import Navigation from './Nav';
import { Jumbotron } from 'react-bootstrap';

const Projects = () => (
  <div>
    {props.map((project, ind) => <Project />)}
  </div>
);

export default Projects;
