import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { Route } from './components/Route';

import { About } from './containers/About';
import { Test } from './containers/Test';
import { Home } from './containers/Home';

import { SATPost } from './containers/blog/SATPost';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/about' title='About' Component={ About } />
          <Route path='/test' title='Test' Component={ Test } />
          <Route
            path='/blog/introduction-to-sat-solvers.html'
            title='Introduction to SAT Solvers'
            Component={ SATPost }
          />
          <Route path='/' title='Home' Component={ Home } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
