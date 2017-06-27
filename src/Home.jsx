import React from 'react';
import Navigation from './Nav';
import AboutMe from './AboutMe';
import Projects from './Projects';

const Home = ({ projects }) => (
  <div>
    <Navigation></Navigation>
    <AboutMe></AboutMe>
    <Projects projects={projects}></Projects>
  </div>
);

export default Home;
