import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/navbar';
import EventForm from './components/event-form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App = () => (
  <div>
    <div><NavBar /></div>
    <div><EventForm /></div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
