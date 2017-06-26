import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import AboutMe from './AboutMe';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/aboutme" component={AboutMe}/>
      <Route path="/blog" component={Blog}/>
    </div>
  </Router>
);

export default App;

