import { ReactElement } from 'react';
import loadable from '@loadable/component';
import './styles/_common.scss';

import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { Route } from './components/Route';

import { About } from './containers/About';
import { Blog } from './containers/Blog';
import { Home } from './containers/Home';

const SATPost = loadable(() => import('./containers/blog/SATPost'), {
  resolveComponent: (components) => components.SATPost,
});

const SudokuSAT = loadable(() => import('./containers/blog/SudokuSAT'), {
  resolveComponent: (components) => components.SudokuSAT,
});

const App = (): ReactElement => (
  <div className="app">
    <Router>
      <Switch>
        { /* Blog posts */ }
        <Route
          path='/blog/sat-solvers-groundwork.html'
          title='Practical SAT Solvers: Groundwork'
        >
          <SATPost />
        </Route>
        <Route
          path='/blog/sat-solvers-sudoku.html'
          title='Practical SAT Solvers: Sudoku Solver'
        >
          <SudokuSAT />
        </Route>
        { /* Main sections */ }
        <Route path='/about' title='About'><About /></Route>
        <Route path='/blog' title='Blog'><Blog /></Route>
        { /* Home */ }
        <Route path='/' title='Home'><Home /></Route>
      </Switch>
    </Router>
  </div>
);

export default App;
