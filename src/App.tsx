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

import { CmTest } from './containers/blog/CmTest';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/about' title='About' Component={ About } />
          <Route path='/test' title='Test' Component={ Test } />
          <Route path='/blog/cm-test' title='Code Mirror Test' Component={ CmTest } />
          <Route path='/' title='Home' Component={ Home } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
