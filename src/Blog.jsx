import React from 'react';
import Navigation from './Nav';

const Blog = (props) => (
  <div>
    { console.log(props.projects) }
    <Navigation></Navigation>
    <h2> Blog </h2>
  </div>
);

export default Blog;
