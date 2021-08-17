import { ReactElement } from 'react';

import { Page } from '../../components/Page';
import { DefaultSidebar } from '../../components/Sidebar';
import { CodeRegion } from '../../components/CodeRegion';
import { EquationBlock } from '../../components/EquationBlock';

import BooleanSat from '../../res/boolean-sat.raw';

export const SudokuSAT = ():ReactElement => {
  return (
    <Page sidebar={ DefaultSidebar }>
      <h2>Practical Introduction to SAT Solvers: Sudoku Solver</h2>
      <p>
        This post is a follow up to a previous post in which the basic functioning of a SAT Solver was explored. This post will demonstrate applying a SAT Solver to a basic example problem: solving a Sudoku puzzle.  If you understand the basics of how SAT Solvers work you might not need to read the prior post, but in it several helper functions were described which will be used here.  You can see them bellow:
      </p>
      { /* TODO remove */ }
      <div style={{'height': '120em'}} />
    </Page>
  );
};

