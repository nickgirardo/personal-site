import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';

import { Route } from './components/Route';

import { About } from './containers/About';
import { Test } from './containers/Test';
import { Home } from './containers/Home';

const Nav = () =>
  <header>
    <Link to='/' >Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/test'>Test</Link>
  </header>

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route path='/about' title='About' Component={ About } />
          <Route path='/test' title='Test' Component={ Test } />
          <Route path='/' title='Home' Component={ Home } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
