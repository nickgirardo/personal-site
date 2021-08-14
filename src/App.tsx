import { ReactElement } from 'react';
import loadable from '@loadable/component';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { Route } from './components/Route';

import { About } from './containers/About';
import { Test } from './containers/Test';
import { Home } from './containers/Home';

const SATPost = loadable(() => import('./containers/blog/SATPost'), {
  resolveComponent: (components) => components.SATPost,
});

const App = (): ReactElement => (
  <div className="app">
    <Router>
      <Switch>
        <Route path='/about' title='About'><About /></Route>
        <Route path='/test' title='Test'><Test /></Route>
        <Route
          path='/blog/introduction-to-sat-solvers.html'
          title='Introduction to SAT Solvers'
        >
          <SATPost />
        </Route>
        <Route path='/' title='Home'><Home /></Route>
      </Switch>
    </Router>
  </div>
);

export default App;
