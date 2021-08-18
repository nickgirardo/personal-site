import { ReactElement } from 'react';

import { Page } from '../../components/Page';
import { DefaultSidebar } from '../../components/Sidebar';
import { CodeRegion } from '../../components/CodeRegion';
import { EquationBlock } from '../../components/EquationBlock';

import BooleanSat from '../../res/sat-post/boolean-sat.js.raw';
import solutionAsClause from '../../res/sat-post/solutionAsClause.js.raw';
import printSolution from '../../res/sat-post/printSolution.js.raw';
import negateClause from '../../res/sat-post/negateClause.js.raw';
import countSolutions from '../../res/sat-post/countSolutions.js.raw';

import X_1 from '../../res/sat-post/x_1.tex';
import X_2 from '../../res/sat-post/x_2.tex';
import X_1TOX_9 from '../../res/sat-post/x_1-to-x_9.tex';
import X_10TOX_18 from '../../res/sat-post/x_10-to-x_18.tex';
import TwoToTheNine from '../../res/sat-post/TwoToTheNine.tex';


const firstCellClauses = `const firstCellClauses = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // All of the possible pairs to eliminate
  [-1, -2],
  [-1, -3],
  [-1, -4],
  [-1, -5],
  [-1, -6],
  [-1, -7],
  [-1, -8],
  [-1, -9],
  [-2, -3],
  [-2, -4],
  [-2, -5],
  [-2, -6],
  [-2, -7],
  [-2, -8],
  [-2, -9],
  [-3, -4],
  [-3, -5],
  [-3, -6],
  [-3, -7],
  [-3, -8],
  [-3, -9],
  [-4, -5],
  [-4, -6],
  [-4, -7],
  [-4, -8],
  [-4, -9],
  [-5, -6],
  [-5, -7],
  [-5, -8],
  [-5, -9],
  [-6, -7],
  [-6, -8],
  [-6, -9],
  [-7, -8],
  [-7, -9],
  [-8, -9],
];`

const secondCellClauses = `const secondCellClauses = [
  [10, 11, 12, 13, 14, 15, 16, 17, 18],
  [-10, -11],
  [-10, -12],
  [-10, -13],
  [-10, -14],
  [-10, -15],
  [-10, -16],
  [-10, -17],
  [-10, -18],
  [-11, -12],
  [-11, -13],
  [-11, -14],
  [-11, -15],
  [-11, -16],
  [-11, -17],
  [-11, -18],
  [-12, -13],
  [-12, -14],
  [-12, -15],
  [-12, -16],
  [-12, -17],
  [-12, -18],
  [-13, -14],
  [-13, -15],
  [-13, -16],
  [-13, -17],
  [-13, -18],
  [-14, -15],
  [-14, -16],
  [-14, -17],
  [-14, -18],
  [-15, -16],
  [-15, -17],
  [-15, -18],
  [-16, -17],
  [-16, -18],
  [-17, -18],
];`

const oneCell1 = `const clauses = [
  // The nine possible values for our first cell
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

// This should output 9... right?
console.log(countSolutions(9, clauses));`

const oneCell2 = `const clauses = [
  // The nine possible values for our first cell
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // All of the possible pairs to eliminate
  [-1, -2],
  [-1, -3],
  [-1, -4],
  [-1, -5],
  [-1, -6],
  [-1, -7],
  [-1, -8],
  [-1, -9],
  [-2, -3],
  [-2, -4],
  [-2, -5],
  [-2, -6],
  [-2, -7],
  [-2, -8],
  [-2, -9],
  [-3, -4],
  [-3, -5],
  [-3, -6],
  [-3, -7],
  [-3, -8],
  [-3, -9],
  [-4, -5],
  [-4, -6],
  [-4, -7],
  [-4, -8],
  [-4, -9],
  [-5, -6],
  [-5, -7],
  [-5, -8],
  [-5, -9],
  [-6, -7],
  [-6, -8],
  [-6, -9],
  [-7, -8],
  [-7, -9],
  [-8, -9],
];

// Ok, now this should output 9 for sure!
console.log(countSolutions(9, clauses));`

const twoCell1 = `const clauses = [
  // All of the above clauses (hidden for space)
  ...firstCellClauses,
  // The nine possible values for our second cell
  [10, 11, 12, 13, 14, 15, 16, 17, 18],
  // All of the possible pairs to eliminate for the second cell
  [-10, -11],
  [-10, -12],
  [-10, -13],
  [-10, -14],
  [-10, -15],
  [-10, -16],
  [-10, -17],
  [-10, -18],
  [-11, -12],
  [-11, -13],
  [-11, -14],
  [-11, -15],
  [-11, -16],
  [-11, -17],
  [-11, -18],
  [-12, -13],
  [-12, -14],
  [-12, -15],
  [-12, -16],
  [-12, -17],
  [-12, -18],
  [-13, -14],
  [-13, -15],
  [-13, -16],
  [-13, -17],
  [-13, -18],
  [-14, -15],
  [-14, -16],
  [-14, -17],
  [-14, -18],
  [-15, -16],
  [-15, -17],
  [-15, -18],
  [-16, -17],
  [-16, -18],
  [-17, -18],
];

// Make sure to update the number of literals to 18
console.log(countSolutions(18, clauses));`

const twoCell2 = `const clauses = [
  // All of the above clauses (hidden for space)
  ...firstCellClauses,
  ...secondCellClauses,
  // All of the possible pairs to eliminate
  [-1, -10],
  [-2, -11],
  [-3, -12],
  [-4, -13],
  [-5, -14],
  [-6, -15],
  [-7, -16],
  [-8, -17],
  [-9, -18],
];

console.log(countSolutions(18, clauses));
console.log(clauses.length);`

const genClause1 = `function sudokuClauses() {
  return [[1, 2, 3, 4, 5, 6, 7, 8, 9]];
}

const clauses = sudokuClauses();
console.log(clauses);

// Ok, now this should be 9 for sure!
console.log(countSolutions(9, clauses));`


export const SudokuSAT = ():ReactElement => {
  return (
    <Page sidebar={ DefaultSidebar }>
      <h2>Practical Introduction to SAT Solvers: Sudoku Solver</h2>
      <p>
        This post is a follow up to a previous post in which the basic functioning of a SAT Solver was explored. This post will demonstrate applying a SAT Solver to a basic example problem: solving a Sudoku puzzle.  If you understand the basics of how SAT Solvers work you might not need to read the prior post, but in it several helper functions were described which will be used here.  You can see them bellow:
      </p>
      <CodeRegion
        code={ `${solutionAsClause}\n${printSolution}\n${negateClause}\n${countSolutions}` }
        codeHeight='26em'
      />
      <p>
        If the purpose or implementation of these functions is unclear, please consider reading the following post where this was detailed.
      </p>

      <h3>Sudoku</h3>
      <p>
        Sudoku is a number placement puzzle.  In Sudoku the player (or automated solver) attempts to place a digit from one to nine in every cell such that no two cells in a given row, column, or region share a value.  While there are many interesting variations on sudoku, for simplicities sake we will only address the most basic ruleset.
      </p>
      <p>
        For a Sudoku puzzle to be solveable by a SAT Solver, we need to express the Sudoku puzzle as a boolean expression in conjunctive normal form (CNF).  While we will need to eventually consider the entire board, to simplify this process we can start ffrom a single cell and build our way up from there.
      </p>

      <h3>The first cell</h3>
      <p>
        Each cell can contain any digit from one to nine.  Unfortunately, boolean logic doesn't simply allow us to assign a literal any of nine values, we are limited to two values: <code>true</code> and <code>false</code>.  Instead of trying to cram all nine values into a single literal, we can instead build more capabale structures from multiple literals.  For simplicity's sake, we can say that <X_1 /> means that our cell contains <code>1</code>, <X_2 /> means that our cell contains <code>2</code>, and so on.  With nine literals, <X_1TOX_9 />, we can represent each of the nine possible states for our cell.
      </p>
      <p>
        Let's try to implement this:
      </p>
      <CodeRegion
        code={ oneCell1 }
        codeHeight='10.5em'
        hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
      />
      <p>
        Wait&mdash; that output <code>511</code>!  The cause of this is actually fairly straightforward.  Our clause simply says that our cell must contain <i>at least</i> one of the nine possible values not <i>exactly</i> one of the nine possible values.  The only one of the <TwoToTheNine /> possible solutions we've eliminated is the solution where all nine values are false.
      </p>
      <p>
        Let's get rid of our extra solutions.  A clause like <code>[-1, -2]</code> means that either <X_1 /> or <X_2 /> must be <code>false</code>.  This can also be read as saying <X_1 /> and <X_2 /> cannot both be true, which is exactly what we're looking for!
      </p>
      <p>
        Here is a second attempt at getting our cell's value sorted:
      </p>
      <CodeRegion
        code={ oneCell2 }
        codeHeight='56em'
        hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
      />
      <p>
        Much better!  We are now correctly counting nine solutions to correspond to the nine possible values that can fill our cell.
      </p>
      <p>
        Still, we've already got a really long list of clauses for only one cell.  If we were to write out all 81 cells like this things would get out of hand.  Fortunately, we can generate our clauses with a program. But first, let's manually add a second tile to make sure our understanding is rock solid.
      </p>

      <h3>The second cell</h3>
      <p>
        Adding a second cell should just be as easy as the first.  We can take the same approach of having each possible value represented by its own literal.  Since <X_1TOX_9 /> are already taken, we will use the next nine literals: <X_10TOX_18 />.
      </p>
      <CodeRegion
        code={ twoCell1 }
        codeHeight='58em'
        hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${firstCellClauses}` }
      />
      <p>
        Running this query should show <code>81</code> solutions.  This makes sense as our each of our cells can store 9 independent values and <code>9 * 9 === 81</code>.
      </p>
      <p>
        However, our two cells <i>shouldn't</i> necessarily be independent.  We haven't yet assigned any notion of position to our cells.  This made sense when we only had one cell, as there was nothing for our cell's position to be relative to.  In Sudoku, a cells position is incredibly important.  From now on, I will consider the first cell to start at the top left corner and the next to follow it to the right.
      </p>
      <p>
        <strong>TODO DIAGRAM MAYBE?</strong>
      </p>
      <p>
        If our two cells are adjacent (which by all means they ought to be), they should not be able to contain the same values.  We can remove equal values as possible solutions with the following clauses:
      </p>
      <CodeRegion
        code={ twoCell2 }
        codeHeight='23em'
        hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${firstCellClauses}${secondCellClauses}` }
      />
      <p>
        The new clauses we've added work the same way as the clauses which force a given cell to only contain one value.  Try to make sense of them.
      </p>
      <p>
        You might notice that this formula has 72 possible equations.  This makes sense.  At first we can choose between any of nine possible values, but afterwards the second cell only has eight options available.  <code>9 * 8 === 72</code>.
      </p>
      <p>
        You also might notice that we're up to 155 total clauses.  This is too many to continue adding clauses manually.  Let's get started writing a program to generate our clauses for us.
      </p>
      
      <h3>Generating clauses</h3>
      <CodeRegion
        code={ genClause1 }
        codeHeight='13em'
        hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
      />
      { /* TODO remove */ }
      <div style={{'height': '120em'}} />
    </Page>
  );
};

