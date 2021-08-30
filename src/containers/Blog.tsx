import { ReactElement } from 'react';

import { Page, BodyType } from '../components/Page';
import { DefaultItems, NavigationType } from '../components/Navigation';
import { BlogEntry } from '../components/BlogEntry';

// TODO link rss feed
export const Blog = ():ReactElement =>
  <Page
    navItems={ DefaultItems }
    navType={ NavigationType.Responsive }
    bodyType={ BodyType.SidebarResponsive }
  >
    <div>
      <h2>Blog</h2>
      <BlogEntry
        name='Practical SAT Solvers: Sudoku'
        link='/blog/sat-solvers-sudoku.html'
        pubDate={ new Date('2021-08-28T04:00:00.000Z') }
      >
        A Sudoku solver is constructed as a practical example of solving problems with SAT solvers.
      </BlogEntry>
      <BlogEntry
        name='Practical SAT Solvers: Groundwork'
        link='/blog/sat-solvers-groundwork.html'
        pubDate={ new Date('2021-08-28T04:00:00.000Z') }
      >
        An exploration of the basics of the Boolean satisfiable problem (SAT) and SAT solvers.
      </BlogEntry>
    </div>
  </Page>;
