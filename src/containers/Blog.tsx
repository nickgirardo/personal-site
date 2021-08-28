import { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Page, BodyType } from '../components/Page';
import { DefaultItems, NavigationType } from '../components/Navigation';

export const Blog = ():ReactElement =>
  <Page
    navItems={ DefaultItems }
    navType={ NavigationType.Responsive }
    bodyType={ BodyType.SidebarResponsive }
  >
    <h2>Blog</h2>
    <p>
      <Link to='/blog/sat-solvers-groundwork.html'>Practical SAT Solvers: Groundwork</Link>
    </p>
    <p>
      <Link to='/blog/sat-solvers-sudoku.html'>Practical SAT Solvers: Sudoku</Link>
    </p>
  </Page>;
