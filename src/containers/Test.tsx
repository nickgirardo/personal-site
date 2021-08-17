import { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const Test = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    <h2>Test content</h2>
    <ul>
      <li>
        <Link to='/blog/sat-solvers-groundwork.html'>Practical Introduction to SAT Solvers: Groundwork</Link>
      </li>
      <li>
        <Link to='/blog/sat-solvers-sudoku.html'>Practical Introduction to SAT Solvers: Sudoku</Link>
      </li>
    </ul>
  </Page>;
