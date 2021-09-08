import { ReactElement } from 'react';

import { Page, BodyType } from '../components/Page';
import { DefaultItems, NavigationType } from '../components/Navigation';

import '../styles/_projects.scss';

export const Projects = ():ReactElement => (
  <Page
    navItems={ DefaultItems }
    navType={ NavigationType.Responsive }
    bodyType={ BodyType.SidebarResponsive }
  >
    <div>
      <h2>Projects</h2>
      <div className='projects-entry'>
        <strong>mathjax-loader</strong>
        <span>
          Webpack loader to transform TeX and MathML files to SVGs via MathJax.  You can check it out on the blog posts on this site.
        </span>
        <a href='https://github.com/nickgirardo/mathjax-loader'>
          View on Github
        </a>
        <a href='https://www.npmjs.com/package/mathjax-loader'>
          View on NPM
        </a>
      </div>
      <div className='projects-entry'>
        <strong>Sudoku</strong>
        <span>
          A basic Sudoku player and builder.  The puzzles for the player are encoded in the query string, which provides many benefits to the player (see Github README)
        </span>
        <a href='https://github.com/nickgirardo/sudoku'>
          View on Github
        </a>
        <a href='./sudoku/player.html'>
          Sudoku Player
        </a>
        <a href='./sudoku/builder.html'>
          Sudoku Builder
        </a>
      </div>
    </div>
  </Page>
);
