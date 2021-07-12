import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
          <Route path='/about'>
            About page
          </Route>
          <Route path='/test'>
            Test page
          </Route>
          <Route path='/'>
            Home page
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
