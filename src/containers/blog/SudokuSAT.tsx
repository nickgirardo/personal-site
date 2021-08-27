import { ReactElement } from 'react';

import { Helmet } from 'react-helmet-async';

import { Page, BodyType } from '../../components/Page';
import { DefaultItems, NavigationType } from '../../components/Navigation';
import { CodeRegion } from '../../components/CodeRegion';

import BooleanSat from '../../res/sat-post/boolean-sat.js.raw';
import solutionAsClause from '../../res/sat-post/solutionAsClause.js.raw';
import printSolution from '../../res/sat-post/printSolution.js.raw';
import negateClause from '../../res/sat-post/negateClause.js.raw';
import countSolutions from '../../res/sat-post/countSolutions.js.raw';
import sudokuClauses from '../../res/sat-post/sudokuClauses.js.raw';

import X_1 from '../../res/sat-post/x_1.tex';
import X_2 from '../../res/sat-post/x_2.tex';
import X_1TOX_9 from '../../res/sat-post/x_1-to-x_9.tex';
import X_10TOX_18 from '../../res/sat-post/x_10-to-x_18.tex';
import TwoToTheNine from '../../res/sat-post/TwoToTheNine.tex';

import CellIds from '../../res/sat-post/cell-ids.png';
import Puzzle from '../../res/sat-post/puzzle.png';

import '../../styles/_article.scss';

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

const cellsCollide = `function sameRow(cell1, cell2) {
  return Math.floor(cell1 / 9) === Math.floor(cell2 / 9);
}

function sameColumn(cell1, cell2) {
  return cell1%9 === cell2%9;
}

function sameRegion(cell1, cell2) {
  return Math.floor(cell1/27) === Math.floor(cell2/27) &&
    Math.floor((cell1%9)/3) === Math.floor((cell2%9)/3);
}

function cellsCollide(cell1, cell2) {
  return sameRow(cell1, cell2) ||
    sameColumn(cell1, cell2) ||
    sameRegion(cell1, cell2);
}`;

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

console.log('number of clauses: ', clauses.length);
console.log(countSolutions(18, clauses));`

const genClause1 = `function sudokuClauses() {
  return [[1, 2, 3, 4, 5, 6, 7, 8, 9]];
}

const clauses = sudokuClauses();

// This set of clauses gave us 511 last time
// Let's make sure that hasn't changed
console.log(countSolutions(9, clauses));`

const genClause2 = `function sudokuClauses() {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const clauses = [];

  // This means "A cell must have some of the given values"
  clauses.push(digits);

  for (const digit of digits) {
    // This iterator gives us every digit after the current digit
    for (const other of digits.slice(digit)) {
      // This means "A cell cannot be both of these values"
      clauses.push([-digit, -other]);
    }
  }

  return clauses;
}

const clauses = sudokuClauses();

console.log(countSolutions(9, clauses));`

const genClause3 = `function sudokuClauses() {
  // Storing the cells and digits we'll iterate over as an array
	// Right now we're just worried about two cells
	const cells = [0, 1];
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// This helper function tells us if two cells are in the same row
	// If so, they must not contain the same value
	function sameRow(cell1, cell2) {
	  return Math.floor(cell1 / 9) === Math.floor(cell2 / 9);
	}

	// This helper function maps a cell and digit numbers to a literal number
	function literal(cell, digit) {
	  return (cell * 9) + digit;
	}

  const clauses = [];
  
  // Loop over each cell
  for (const cell of cells) {
    // This means "A cell must have some of the given values"
    clauses.push(digits.map(d => literal(cell, d)));

    for (const digit of digits) {
      // This iterator gives us every digit after the current digit
      for (const other of digits.slice(digit)) {
        // This means "A cell cannot be both of these values"
        clauses.push([-literal(cell, digit), -literal(cell, other)]);
      }
    }

    // This iterator gives us every cell after the current cell
    // The "+ 1" is needed here and not above because cells is 0 based
    for (const other of cells.slice(cell + 1)) {
      // If we aren't in the same row no need to add this check
      if (!sameRow(cell, other))
        continue;

      for (const digit of digits) {
        clauses.push([-literal(cell, digit), -literal(other, digit)]);
      }
    }
  }
  
  // Tuple of (number of values, clauses)
  return [cells.length*digits.length, clauses];
}

const [numValues, clauses] = sudokuClauses();
console.log('number of clauses: ', clauses.length);

// To make sure we're setting the number of literals correctly
// we can base it off the number of cells and digits
console.log(countSolutions(numValues, clauses));`;


const givenCells = `// This helper function tells us if two cells are in the same row
// If so, they must not contain the same value
function sameRow(cell1, cell2) {
  return Math.floor(cell1 / 9) === Math.floor(cell2 / 9);
}

function sudokuClauses(givenCells) {
  // Storing the cells and digits we'll iterate over as an array
	// Right now we're just worried about two cells
	const cells = [0, 1];
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// This helper function maps a cell and digit numbers to a literal number
	function literal(cell, digit) {
	  return (cell * 9) + digit;
	}

  const clauses = [];
  
  // Constrain the puzzle with the given cells
  for (const [cell, digit] of givenCells) {
    clauses.push([literal(cell, digit)]);
  }

  // Loop over each cell
  for (const cell of cells) {
    // This means "A cell must have some of the given values"
    clauses.push(digits.map(d => literal(cell, d)));

    for (const digit of digits) {
      // This iterator gives us every digit after the current digit
      for (const other of digits.slice(digit)) {
        // This means "A cell cannot be both of these values"
        clauses.push([-literal(cell, digit), -literal(cell, other)]);
      }
    }

    // This iterator gives us every cell after the current cell
    // The "+ 1" is needed here and not above because cells is 0 based
    for (const other of cells.slice(cell + 1)) {
      // If we aren't in the same row no need to add this check
      if (!sameRow(cell, other))
        continue;

      for (const digit of digits) {
        clauses.push([-literal(cell, digit), -literal(other, digit)]);
      }
    }
  }
  
  // Tuple of (number of values, clauses)
  return [cells.length*digits.length, clauses];
}

// Nothing should change here, expect 72 like before
console.log(countSolutions(...sudokuClauses([])));

// With one cell set the other should have 8 digits to choose from
console.log(countSolutions(...sudokuClauses([[1, 4]])));

// If both cells are set, that is the only possible configuration
// So this should give us one total solution
console.log(countSolutions(...sudokuClauses([[0, 8], [1, 1]])));

// These are not valid puzzles, there should be no solutions
console.log(countSolutions(...sudokuClauses([[0, 3], [0, 7]])));
console.log(countSolutions(...sudokuClauses([[0, 5], [1, 5]])));`

const fullBoard1 = `function sameColumn(cell1, cell2) {
  return cell1%9 === cell2%9;
}

function sameRegion(cell1, cell2) {
  return Math.floor(cell1/27) === Math.floor(cell2/27) &&
    Math.floor((cell1%9)/3) === Math.floor((cell2%9)/3);
}

console.log('sameColumn');
console.log(sameColumn(0, 1));
console.log(sameColumn(0, 18));
console.log(sameColumn(5, 32));

console.log('sameRegion');
console.log(sameRegion(0, 12));
console.log(sameRegion(0, 18));
console.log(sameRegion(36, 47));`

const fullBoard2 = `function cellsCollide(cell1, cell2) {
  return sameRow(cell1, cell2) ||
    sameColumn(cell1, cell2) ||
    sameRegion(cell1, cell2);
}

// Same row
console.log(cellsCollide(0, 8));
// Same column
console.log(cellsCollide(7, 79));
// Same region
console.log(cellsCollide(29, 45));
// Different row, column and region: No collision
console.log(cellsCollide(5, 80));`;

const fullBoard2prelude = `function sameRow(cell1, cell2) {
  return Math.floor(cell1 / 9) === Math.floor(cell2 / 9);
}

function sameColumn(cell1, cell2) {
  return cell1%9 === cell2%9;
}

function sameRegion(cell1, cell2) {
  return Math.floor(cell1/27) === Math.floor(cell2/27) &&
    Math.floor((cell1%9)/3) === Math.floor((cell2%9)/3);
}`;

const fullBoard3 = `const cells = [...Array(81).keys()];

console.log(cells.length);
console.log(cells);`;


const fullBoard4 = `// To save space, the definition of cellsCollide() is elided
${sudokuClauses}`;

const fullBoard5 = `const board = [
  [0, 5], [4, 3], [5, 1], [7, 4], [8, 6],
  [9, 4], [10, 1], [12, 7], [17, 2],
  [24, 7], [26, 8],
  [30, 1], [32, 2], [34, 7],
  [38, 4], [42, 1],
  [46, 8], [48, 3], [50, 4],
  [54, 6], [56, 3],
  [63, 8], [68, 9], [70, 6], [71, 7],
  [72, 7], [73, 5], [75, 6], [76, 4], [80, 9]
];

printSolution(satSolve(...sudokuClauses(board)));`;

const formatting1 = `// This helper function maps a cell and digit numbers to a literal number
function literal(cell, digit) {
  return (cell * 9) + digit;
}`;

const formatting2 = `// This inverts literal
function extract(value) {
  const cell = Math.floor((value-1) / 9);
  const digit = ((value - 1) % 9) + 1;

  return [cell, digit];
}

// Note that increasing the input by multiples of 9 only changes the cell
console.log(extract(7));
console.log(extract(16));
console.log(extract(457));

// There and back again
console.log(literal(...extract(700)));
console.log(extract(literal(10, 6)));`;

const extract = `function extract(value) {
  const cell = Math.floor((value-1) / 9);
  const digit = ((value - 1) % 9) + 1;

  return [cell, digit];
}`;

const formatting3 = `const board = [
  [0, 5], [4, 3], [5, 1], [7, 4], [8, 6],
  [9, 4], [10, 1], [12, 7], [17, 2],
  [24, 7], [26, 8],
  [30, 1], [32, 2], [34, 7],
  [38, 4], [42, 1],
  [46, 8], [48, 3], [50, 4],
  [54, 6], [56, 3],
  [63, 8], [68, 9], [70, 6], [71, 7],
  [72, 7], [73, 5], [75, 6], [76, 4], [80, 9]
];

const solution = solutionAsClause(satSolve(...sudokuClauses(board)));

console.log(solution.filter(v => v > 0).map(extract));`;

const formatting4 = `const board = [
  [0, 5], [4, 3], [5, 1], [7, 4], [8, 6],
  [9, 4], [10, 1], [12, 7], [17, 2],
  [24, 7], [26, 8],
  [30, 1], [32, 2], [34, 7],
  [38, 4], [42, 1],
  [46, 8], [48, 3], [50, 4],
  [54, 6], [56, 3],
  [63, 8], [68, 9], [70, 6], [71, 7],
  [72, 7], [73, 5], [75, 6], [76, 4], [80, 9]
];

const solution = solutionAsClause(satSolve(...sudokuClauses(board)));
const digitValues = solution.filter(v => v > 0).map(v => extract(v)[1]);

for (const row of [0, 1, 2, 3, 4, 5, 6, 7, 8])
  console.log(digitValues.slice(row*9, (row+1)*9));`;

export const SudokuSAT = ():ReactElement => {
  return (
    <Page
      navItems={ DefaultItems }
      navType={ NavigationType.Header }
      bodyType={ BodyType.Article }
    >
      <Helmet>
        <meta name='author' content='nickgirardo@gmail.com (Nick Girardo)' />
        <meta name='description' content='A Sudoku solver is constructed as a practical example of solving problems with SAT solvers.' />
        { /* TODO fix date here */ }
        <meta name='created' content='2021-08-28' />
        <meta name='id' content='3bbb20b5-f2fb-4e4f-96a8-10d8e17d1fee' />
      </Helmet>

      <article>
        <h2>Practical SAT Solvers: Sudoku Solver</h2>
        <section>
          <p>
            This post is a follow up to a previous post in which the basic functioning of a SAT Solver was explored. This post will demonstrate applying a SAT Solver to a basic example problem: solving a Sudoku puzzle.  If you understand the basics of how SAT Solvers work, you might not need to read the prior post, but in it several helper functions were described which will be used here.  You can see them bellow:
          </p>
          <CodeRegion
            code={ `${solutionAsClause}\n${printSolution}\n${negateClause}\n${countSolutions}` }
            codeHeight='26em'
          />
          <p>
            If the purpose or implementation of these functions is unclear, please consider reading the following post where this was detailed.
          </p>
        </section>

        <section>
          <h3>Sudoku</h3>
          <p>
            Sudoku is a number placement puzzle.  In Sudoku, the player (or automated solver) attempts to place a digit from one to nine in every cell such that no two cells in a given row, column, or region share a value.  While there are many interesting variations on sudoku, for simplicity's sake we will only address the most basic ruleset.
          </p>
          <p>
            For a Sudoku puzzle to be solveable by a SAT Solver, we need to express the Sudoku puzzle as a boolean expression in conjunctive normal form (CNF).  While we will eventually need to consider the entire board, to simplify this process we can start from a single cell and build our way up from there.
          </p>
        </section>

        <section>
          <h3>The first cell</h3>
          <p>
            Each cell can contain any digit from one to nine.  Unfortunately, boolean logic doesn't simply allow us to assign a literal any of nine values, we are limited to two values: <code>true</code> and <code>false</code>.  Instead of trying to cram all nine values into a single literal, we can instead build more capabale structures from multiple literals.  We can say that <X_1 /> means that our cell contains 1, <X_2 /> means that our cell contains 2, and so on.  With nine literals, <X_1TOX_9 />, we can represent each of the nine possible states for our cell.
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
            Wait&mdash; that output 511!  The cause of this is actually fairly straightforward.  Our clause simply says that our cell must contain <i>at least</i> one of the nine possible values, not <i>exactly</i> one of the nine possible values.  The only one of the <TwoToTheNine /> possible solutions we've eliminated is the solution where all nine values are false.
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
            Still, we've already got a really long list of clauses for only one cell.  If we were to write out all 81 cells like this, things would get out of hand.  Fortunately, we can generate our clauses with a program. But first, let's manually add a second tile to make sure our understanding is rock solid.
          </p>
        </section>

        <section>
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
            Running this query should show 81 solutions.  This makes sense as our each of our cells can store 9 independent values and <code>9 * 9 === 81</code>.
          </p>
          <p>
            However, our two cells <i>shouldn't</i> necessarily be independent.  We haven't yet assigned any notion of position to our cells.  This made sense when we only had one cell, as there was nothing for our cell's position to be relative to.  In Sudoku, a cell's position is incredibly important.  From now on, I will consider the first cell to start at the top left corner and the next to follow it to the right.  The image below might help explain how a cell's id corresponds to its position:
          </p>
          <img src={ CellIds } alt="Diagram describing how cell ids are laid out" />
          <p>
            If our two cells are adjacent (which by all means they ought to be), they should not be able to contain the same values.  We can remove equal values as possible solutions with the following clauses:
          </p>
          <CodeRegion
            code={ twoCell2 }
            codeHeight='24em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${firstCellClauses}${secondCellClauses}` }
          />
          <p>
            The new clauses we've added work the same way as the clauses which force a given cell to only contain one value.  Try to make sense of them.
          </p>
          <p>
            You might notice that this formula has 72 possible equations.  This makes sense.  At first, we can choose between any of nine possible values, but afterwards the second cell only has eight options available.  <code>9 * 8 === 72</code>.
          </p>
          <p>
            You also might notice that we're up to 83 total clauses.  This is too many to continue adding clauses manually.  Let's get started writing a program to generate our clauses for us.
          </p>
        </section>

        <section>
          <h3>Generating clauses</h3>
          <p>
            Returning clauses created by a function should be no different than writing them ourselves.  As a simple test, let's return a set of clauses we used briefly earlier.
          </p>
          <CodeRegion
            code={ genClause1 }
            codeHeight='13em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
          />
          <p>
            Now let's write a function which generates our first cell for us.
          </p>
          <CodeRegion
            code={ genClause2 }
            codeHeight='27.5em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
          />
          <p>
            This works, but we're taking a lot of shortcuts here.  If we want to generate clauses for two cells, we will have to be a bit more rigorous.  For one, we're making the assumption here that every digit is its value&mdash; this only hold true on the first cell.
          </p>
          <CodeRegion
            code={ genClause3 }
            codeHeight='40em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
          />
          <p>
            Note that we have the same 72 solutions and 83 clauses as when we wrote the clauses by hand.
          </p>
          <p>
            We've made a few helper functions.  <code>sameRow</code> takes in two cells as arguments and returns <code>true</code> if they are in the same row.  Later, we will need to implement <code>sameColumn</code> and <code>sameRegion</code> but <code>sameRow</code> is enough for now.  <code>literal</code> takes a cell and a digit as arguments and returns the relevant literal id.  In our previous example this wasn't needed as we only had one cell (cell 0) and <code>literal(0, digit) === digit</code>.
          </p>
          <p>
            Even with these new helpers our <code>sudokuClauses</code> function has gotten much more complex.  The most important change is that we now iterate over an array of cells.  Right now our array of cells has only two entries, but this will work the same when all 81 cells are present.  We also have a check to make sure cells in the same row don't share a value.  Later, this will need to be expanded to also check if cells are in the same column or region as well.
          </p>
          <p>
            One more, minor change we've made is to <code>sudokuClauses</code>' return value.  <code>sudokuClauses</code> now returns a tuple of <code>[numberOfValues, clauses]</code> instead of just returning the clauses.  This is done because the number of values depends on the number of cells (and digits per cell, but this value won't be changing).  The number of cells can be considered an implementation detail of <code>sudokuClauses</code>; with this change the caller doesn't need to be aware of it.
          </p>
          <p>
            This is basically all of the groundwork for generating clauses for all 81 cells.  Before we get to that, let's check out an important part of Sudoku we haven't touched on as of yet.
          </p>
        </section>

        <section>
          <h3>Given cells</h3>
          <p>
            A Sudoku puzzle is defined by which cells are given and what their values are.  It doesn't make any sense to have a Sudoku solver without accounting for given cells.
          </p>
          <p>
            How can we represent given cells as CNF clauses?  This is actually fairly trivial.  Setting the required literal to true is all that's required.
          </p>
          <p>
            We can modify <code>sudokuClauses</code> to take a list of given cells as an argument.  We'll represent the given cells as a tuple of <code>[cell, digit]</code> (JavaScript doesn't really have proper tuple support, so a subarray will do).  This means, for instance, that passing in <code>[[47, 3], [50, 7]]</code> will state that cell 47 must contain 3 and cell 50 must contain 7.
          </p>
          <CodeRegion
            code={ givenCells }
            codeHeight='58em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}` }
          />
          <p>
            With these changes we were able to test some of our assumptions.  For instance, with <code>oneCellSet</code> in the above example, we set cell 1 to 4.  This SAT Solver finds 8 possible solutions as we would expect (corresponding to cell 0 being equal to 1, 2, 3, 5, 6, 7, 8, and 9).  In the other cases, we see that setting both cells to valid digits gives us exactly one solution and the two invalid puzzles have 0 solutions.  When we pass an empty array, we get the same 72 solutions as before we accounted for given cells.
          </p>
        </section>

        <section>
          <h3>The rest of the board</h3>
          <p>
            When we were working with two cells, we created a helper function <code>sameRow</code> to check if two cells were in the same row.  Now that we're adding more cells, we'll require similar <code>sameColumn</code> and <code>sameRegion</code> methods.  <code>sameColumn</code> is pretty straightforward but <code>sameRegion</code> might take some effort to wrap your head around.
          </p>
          <CodeRegion
            code={ fullBoard1 }
            codeHeight='24em'
          />
          <p>
            Another simple helper function can wrap these three
          </p>
          <CodeRegion
            code={ fullBoard2 }
            codeHeight='19em'
            hiddenPrelude={ fullBoard2prelude }
          />
          <p>
            We also need to modify our array of cell numbers.  With only two cells it was trivial to hardcode the array.  While this is still possible with 81 cells, that's not how I want to spend my time.
          </p>
          <CodeRegion
            code={ fullBoard3 }
            codeHeight='7em'
          />
          <p>
            The above line is a quick and easy way to build a range of numbers in JavaScript.  This is not the most performant way of building this range, but in this context any minor performance penalty is negligible.  The lack of a proper standard range method is something that constantly irks me.
          </p>
          <p>
            These are the only minor changes required to our previous <code>sudokuClauses</code> function to handle full boards.  Here is the code in full:
          </p>
          <CodeRegion
            code={ fullBoard4 }
            codeHeight='44em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${cellsCollide}` }
          />
          <p>
            With this set up, we can give our solver its first board to solve.
          </p>
          <img src={ Puzzle } alt="Example sudoku puzzle" />
          <p>
            All we need to do is encode our board in the constant <code>board</code> below and everything else is already taken care of.
          </p>
          <CodeRegion
            code={ fullBoard5 }
            codeHeight='18em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${cellsCollide}${sudokuClauses}` }
          />
          <p>
            It looks like we've solved our first sudoku board!  Well, it's kind of hard to tell with the current format.  Fortunately, formatting our solution in a way that can be easily understood is pretty easy.
          </p>
        </section>

        <section>
          <h3>Formatting solutions</h3>
          <p>
            In the solution printed above, every negative value corresponds to a digit that doesn't belong in a given cell.  Because we are only concerned with the digits that do belong in cells, we can ignore all negative values.  With only the important values left, let's recall our helper function <code>literal()</code>.
          </p>
          <CodeRegion
            code={ formatting1 }
            codeHeight='7em'
          />
          <p>
            With the knowledge that <code>digit</code> is between 1 and 9, we can invert this function:
          </p>
          <CodeRegion
            code={ formatting2 }
            hiddenPrelude={ formatting1 }
            codeHeight='22em'
          />
          <p>
            Now, we have everything we need to transform our solution into the tuple format expected by <code>sudokuClauses</code>.
          </p>
          <CodeRegion
            code={ formatting3 }
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${cellsCollide}${sudokuClauses}${extract}` }
            codeHeight='20.5em'
          />
          <p>
            Although printing the solution in the shape of a board will probably be easier for humans to understand.
          </p>
          <CodeRegion
            code={ formatting4 }
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}${countSolutions}${cellsCollide}${sudokuClauses}${extract}` }
            codeHeight='23em'
          />
        </section>
      </article>
      { /* TODO footer */ }
    </Page>
  );
};

