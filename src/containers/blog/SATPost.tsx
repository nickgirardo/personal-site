import { ReactElement } from 'react';

import { Helmet } from 'react-helmet-async';

import { dateToString } from '../../util';

import { Page, BodyType } from '../../components/Page';
import { DefaultItems, NavigationType } from '../../components/Navigation';
import { CodeRegion } from '../../components/CodeRegion';
import { EquationBlock } from '../../components/EquationBlock';
import { ScreenSizeWarning } from '../../components/ScreenSizeWarning';

import BooleanSat from '../../res/sat-post/boolean-sat.js.raw';
import solutionAsClause from '../../res/sat-post/solutionAsClause.js.raw';
import printSolution from '../../res/sat-post/printSolution.js.raw';
import negateClause from '../../res/sat-post/negateClause.js.raw';
import countSolutions from '../../res/sat-post/countSolutions.js.raw';

import Formula1 from '../../res/sat-post/formula1.tex';
import Or from '../../res/sat-post/or.tex';
import And from '../../res/sat-post/and.tex';
import Not from '../../res/sat-post/not.tex';
import X_1 from '../../res/sat-post/x_1.tex';
import X_2 from '../../res/sat-post/x_2.tex';
import X_3 from '../../res/sat-post/x_3.tex';
import NotCNF1 from '../../res/sat-post/notcnf1.tex';
import NotCNF2 from '../../res/sat-post/notcnf2.tex';
import NotCNF3 from '../../res/sat-post/notcnf3.tex';
import CNF1 from '../../res/sat-post/cnf1.tex';
import CNF2 from '../../res/sat-post/cnf2.tex';
import CNF3 from '../../res/sat-post/cnf3.tex';

import '../../styles/_article.scss';

const code1 = `const clauses = [
  [1, -2],
  [-1, 2],
];

const solution = satSolve(2, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log('Solution found!', solution);
}`;

const code2 = `function translated(x1, x2) {
  return (x1 || !x2) && (!x1 || x2);
}

console.log(translated(false, false));
console.log(translated(false, true));
console.log(translated(true, false));
console.log(translated(true, true));`;


const code3 = `const clauses = [
  [1],
  [-1],
];

const solution = satSolve(1, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log('Solution found!', solution);
}`;

const code4 = `const clauses = [
  [-1, -2],
  [-3],
];

const solution = satSolve(3, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log('Solution found!', solution);
}`;

const code5 = `${solutionAsClause}
const clauses = [
  [-1, -2],
  [-3],
];

const solution = satSolve(3, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log('Solution found!', solutionAsClause(solution));
}`;

const code6 = `// To save space, the definition of solutionAsClause() is elided
${printSolution}
const clauses = [
  [-1, -2],
  [-3],
];

printSolution(satSolve(3, clauses));
printSolution(satSolve(3, clauses));
printSolution(satSolve(3, clauses));
printSolution(satSolve(3, clauses));`;

const code7 = `// To save space, the definition of printSolution() is elided
${negateClause}
const clauses = [
  [-1, -2],
  [-3],
];

const firstSolution = satSolve(3, clauses);
printSolution(firstSolution);

if (firstSolution) {
  const newClause = negateClause(solutionAsClause(firstSolution));
  clauses.push(newClause);
  const secondSolution = satSolve(3, clauses);

  printSolution(secondSolution);
}`;

const code8 = `// To save space, the definition of negateClause() is elided
${countSolutions}
const clauses = [
  [-1, -2],
  [-3],
];

console.log(countSolutions(3, clauses));`;

export const SATPost = ():ReactElement => {
  // Publish date as ISO8601 formatted string
  const pubDate = new Date('2021-08-28T04:00:00.000Z');

  return (
    <Page
      navItems={ DefaultItems }
      navType={ NavigationType.Header }
      bodyType={ BodyType.Article }
    >
      <Helmet>
        <meta name='author' content='nickgirardo@gmail.com (Nick Girardo)' />
        <meta name='description' content='Exploration of the basics of SAT solvers' />
        { /* TODO fix date here */ }
        <meta name='created' content={ pubDate.toISOString() } />
        <meta name='id' content='11c988d0-e0aa-4925-89c6-710f94d0132c' />
      </Helmet>

      <article>
        <ScreenSizeWarning>
          Heads up: some of the interactive code elements on this page are not well suited to small screens.
        </ScreenSizeWarning>
        <h2>Practical SAT Solvers: Groundwork</h2>
        <section>
          <p>
            SAT Solvers are computer programs which solve the boolean satisfiability problem.  The boolean satisfiability problem is the problem of determining if a given boolean formula has solutions.  For instance, the formula <code>x || !y</code> is satisfiable (or SAT in academic parlance).  It will be satisfied if <code>x</code> is <code>true</code> or if <code>y</code> is <code>false</code>. The formula <code>x && !x</code> is usatisfiable (or UNSAT in academic parlance).
          </p>
          <p>
            SAT Solvers are a kind of constraint solver.  This means that we give the solver a series of constraints (in this case the boolean formula) as input and it works to find a solution.  The inner workings of SAT Solvers are fascinating, but one doesn't need to know exactly how they work to make use of them.  In this post I will treat SAT Solvers like black boxes, taking their functioning for granted.  The specific SAT Solver used in this post is <a href="https://github.com/cemulate/SAT.js" target="_blank" rel="noopener noreferrer">SAT.js</a> (or boolean-sat on npm) as it is trivial to run it in the browser, but the ideas presented here should work for any SAT Solver.
          </p>
          <p>
            Like other constraint solvers, SAT Solvers can enable dynamic programming.  Once a programmer describes their problem (in a form the solver can understand) the task of actually working through a solution is offloaded to the solver.  Dynamic programming's inversion of work from computing a solution to describing a problem can be incredibly liberating.  Some forms of dynamic programming can be found everywhere in computing.  SAT Solvers are specifically interesting to me because of how low level they are.  As will be demonstrated, SAT Solvers can answer complex questions which are composed of incredibly simple primitives.
          </p>
          <p>
            Let's take our first look at a simple SAT problem:
          </p>
          <CodeRegion
            code={ code1 }
            codeHeight='16em'
            hiddenPrelude={ BooleanSat }
          />
          <p>
            Don't worry if what's going on isn't clear.  The clauses in the above program can be translated to the following:
          </p>
          <EquationBlock><Formula1 /></EquationBlock>
          <p>
            If you are unfamiliar with mathematical notation, the above may be difficult to read.  The character&nbsp;
            <Or /> means "or," the character&nbsp;
            <And /> means "and," the character&nbsp;
            <Not /> means "not," and, lastly, <X_1 /> and <X_2 /> represent two "literals" which can be either <code>true</code> or <code>false</code>. You can think of literals like boolean variables.
          </p>
          <p>
            It might be easier to make sense of this if we translated it back into a computer language:
          </p>
          <CodeRegion
            code={ code2 }
            codeHeight='12em'
          />
          <p>
            Here <code>translated</code> is a function which takes in two boolean variables, much like how in the mathematical notation above we had two literals.  If <code>translated</code> returns <code>true</code>, the formula is considered satisfied. If instead <code>false</code> is returned, the formula is considered unsatisfied.  Note that a formula is unsatisfiable (UNSAT) if for all possible imputs the formula is unsatisfied.
          </p>
          <p>
            This brings us back to SAT Solvers.  SAT Solvers find a combination of assignments to literals which satisfy given problems, or let us know that a problem is unsatisfiable.
          </p>
          <p>
            Consider the following problem:
          </p>
          <CodeRegion
            code={ code3 }
            codeHeight='16em'
            hiddenPrelude={ BooleanSat }
          />
          <p>
            The first clause says that the first literal must be <code>true</code>. The second clause says that the first literal must be <code>false</code>. Regardless of whether we set the first literal to <code>true</code> or <code>false</code>, one of the clauses will not hold.  This means the problem is unsatisfiable (UNSAT).
          </p>
          <p>
            Before we go on, there is one more thing we should note.  The first parameter of <code>solveSat()</code> describes how many literals are in a problem.  The example above only has one, <X_1 />.  Note that our first example has two literals and therefore passes <code>2</code> as the first parameter to <code>solveSat()</code>.
          </p>
        </section>

        <section>
          <h3>Clause structure</h3>
          <p>
            Let's examine the structure of the clauses.  Earlier I stated that <code>[[1, -2], [-1, 2]]</code> translates to&nbsp;
            <Formula1 />&mdash;
            which itself corresponds to <code>(x1 || !x2) && (!x1 || x2)</code>. Clauses are provided to the solver in what is known as Conjunctive Normal Form (CNF).
          </p>
          <p>
            A formula in CNF is a <i>conjunction</i> of clauses, where each clause is a <i>disjunction</i> of literals. A conjunction of clauses means the clauses are AND'ed together.  A disjunction of literals means the literals are OR'ed together. This greatly limits how we can express formulas. The following formulas are not in CNF:
          </p>
          <EquationBlock><NotCNF1 /></EquationBlock>
          <p>
            Here we see clauses with ANDs OR'ed together.  It must be the other way around
          </p>
          <EquationBlock><NotCNF2 /></EquationBlock>
          <p>
            Here we see nested clauses
          </p>
          <EquationBlock><NotCNF3 /></EquationBlock>
          <p>
            Here we see clauses in whole negated.  Only the literals within the clauses may be negated. The clauses are also joined by an OR.
          </p>
          <p>
            While these restrictions may seem limiting, all of the above formulas&mdash; and in fact <i>all</i> predicate formulas&mdash; can be represented in CNF.  The above three formulas are equivalent to the following:
          </p>
          <EquationBlock><CNF1 /></EquationBlock>
          <EquationBlock><CNF2 /></EquationBlock>
          <EquationBlock><CNF3 /></EquationBlock>
          <p>
            Explaining how to convert formulas into CNF is outside of the scope of this post.  The important thing to understand is that while CNF is stylistically constraining and may take getting used to, using CNF doesn't actaully constrain what SAT Solvers can accomplish.
          </p>
          <p>
            Once we have our formula in CNF, setting the SAT Solver up is easy.  Here is how the last formula of the above would be set up:
          </p>
          <CodeRegion
            code={ code4 }
            codeHeight='16em'
            hiddenPrelude={ BooleanSat }
          />
          <p>
            Note that above each clause is represented by one of the sub-arrays to the main clause array.  Each literal is represented by an integer&mdash; negative if the literal is negated and positive otherwise.
          </p>
        </section>

        <section>
          <h3>Making sense of the solver's output</h3>
          <p>
            When running the above examples, you may have noted the solution was represented like <code>[null, false, true, false]</code>.  How a solver represents its output may vary between solvers.  The solver we are using in this post returns an array where the first element is always null and each following element describes whether the literal at its index would be true or false.  For example, <code>[null, false, true, false]</code> means the problem would be satisfied if <X_1 /> were <code>false</code>, <X_2 /> were <code>true</code>, and <X_3 /> were <code>false</code>.
          </p>
          <p>
            This output might make more sense if it were represented more similarly to how we represent clauses.  Below is a quick function to demonstrate this:
          </p>
          <CodeRegion
            code={ code5 }
            codeHeight='29em'
            hiddenPrelude={ BooleanSat }
          />
          <p>
            Now&mdash; much like our clause input&mdash; our solution output has positive integers representing literals set to true and negative integers representing literals set to false.  These forms are equivalent; if you so desired you could write a function <code>clauseAsSolution</code> to reverse the above process.  I find the above form more easy to reason about, and it will prove useful in the next section&hellip;
          </p>
        </section>

        <section>
          <h3>Multiple satisfying solutions</h3>
          <p>
            If you've run the above examples multiple times, you may have noticed the output is not always the same.  The boolean formulas we feed to the SAT Solver can (and very often will) have multiple valid solutions which satisfy it.
          </p>
          <p>
            To better aid our understanding of these problems, I will describe a way to count or display the multiple solutions.  Before doing so I wanted to give a quick disclaimer that this is not the most efficient way to go about this.  The following method involves solving the problem anew each time.  This means the solver will discard all of the valuable information it discovered during the previous run.  In this post I want to treat SAT Solvers as black boxes, but this could not go without saying.  Because our formulas are basically trivial compared to real-world formulas, performance will not be a concern here.  I will describe this process to help illustrate how to think about the clauses we feed to our solver.
          </p>
          <p>
            With that out of the way, let's begin.  One way to count the solutions is just to run the solver multiple times and hope that a new solution is given:
          </p>
          <CodeRegion
            code={ code6 }
            codeHeight='24em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}` }
          />
          <p>
            This method&hellip; isn't great. For one, you will almost certainly get a bunch of duplicates while finding all of the unique solutions.  More importantly, it is impossible to tell when all unique solutions have been found.
          </p>
          <p>
            What if we could tell the solver that we already received a solution and to not return it again?  If we can phrase it as a boolean clause, this can work.  And we can!  Check out this approach:
          </p>
          <CodeRegion
            code={ code7 }
            codeHeight='27em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}` }
          />
          <p>
            No matter how many times you run the above program, the two solutions will never be the same.  Why is this?
          </p>
          <p>
            Let's break it down.  After we find our first solution, we represent it as a clause and negate it.  What does this new clause represent?  This clauses disqualifies the exact solution we found as <code>firstSolution</code>.  It can be read as "at least one value must differ from what was found." For our purposes it's important that it disqualifies exactly the solution we found earlier and no other solutions.  The solution that <code>satSolve()</code> returns to us gives us the state of each value in the found solution.  A clause which has a literal for each value can remove at most one possible solution (feel free to try and prove this for yourself).  If this is still unclear, try logging the value <code>newClause</code> and noting how it corresponds to <code>firstSolution</code>.
          </p>
          <p>
            Once we understand this, we have everything we need to build a function that counts possible solutions (albeit inefficiently).
          </p>
          <CodeRegion
            code={ code8 }
            codeHeight='33em'
            hiddenPrelude={ `${BooleanSat}${solutionAsClause}${printSolution}${negateClause}` }
          />
          <p>
            Looks good to me!  Once we had figured out the general idea in the last example, all we needed to do was set up a loop.  It might be helpful to your understanding to add a <code>printSolution()</code> call to the loop.  You can note our solutions are unique and complete.
          </p>
          <p>
            This function also needs to take the number of literals in the formula as an argument so it can pass it to <code>satSolve()</code>.  Check out what happens when you increase this value without changing the clauses at all.  Is the behavior what you expected?  Counting the number of solutions is sort of adjacent to the real problems SAT Solvers can help with, but being able to count functions can help reinforce our understanding of these problems.
          </p>
        </section>

        { /* TODO fix date */ }
        <footer>
          <span>
            Posted by Nick Girardo on&nbsp;
            <time dateTime={ pubDate.toISOString() }>{ dateToString(pubDate) }</time>
          </span>
        </footer>
      </article>
    </Page>
  );
};

