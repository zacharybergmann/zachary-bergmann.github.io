import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const projects = [
  {
    name: 'LangSnap',
    deployedUrl: 'http://www.github.com',
    image: './images/bargainhound.jpg',
    description: 'A customizable language learning experience focused on transitioning from phrases to fluency',
  },
  {
    name: 'Bargain Hound',
    deployedUrl: 'http://bargainhound.zacharybergmann.com',
    image: './images/bargainhound.jpg',
    description: 'Identifying publicly traded stocks that may be a bargain',
  },
  {
    name: 'Spork',
    deployedUrl: 'http://www.github.com',
    image: './images/spork.jpg',
    description: 'Sharing leftovers with friends to create delicious meals with a social atmosphere'
  },
  {
    name: 'PickUp',
    deployedUrl: 'http://pickup.zacharybergmann.com',
    image: './images/pickup_how_to.jpg',
    description: 'An internet and text interface for joining and creating pick-up sports games',
  },
];

const blogs = [
  {
    name: 'Using TravisCI for continuous integration to GitHub organizations',
    publishedDate: 'June 6, 2017',
    image: '',
    file: 'travis_ci_continuous_gh.md',
  },
  {
    name: 'Using Sequelize ORM to manage relationships in a PostgreSQL database',
    publishedDate: 'May 30, 2017',
    image: '',
    file: './blogs/sequelize_w_postgres.md'
  },
];

ReactDOM.render(
  <main>
    <BrowserRouter>
      <App blogs={blogs} projects={projects} />
    </BrowserRouter>
  </main>
  , document.getElementById('root'));
registerServiceWorker();
