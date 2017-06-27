import React from 'react';
import Navigation from './Nav';
import { Jumbotron } from 'react-bootstrap';
import Project from './Project';

const Projects = ({ projects }) => (
  <div>
    {projects.map((project, ind) => <Project project={project} key={project.name} />)}
  </div>
);

export default Projects;
