import { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const Blog = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    <h2>Blog</h2>
    <ul>
      <li>
        <Link to='/blog/sat-solvers-groundwork.html'>Practical SAT Solvers: Groundwork</Link>
      </li>
      <li>
        <Link to='/blog/sat-solvers-sudoku.html'>Practical SAT Solvers: Sudoku</Link>
      </li>
    </ul>
  </Page>;
