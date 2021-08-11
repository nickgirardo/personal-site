import { ReactElement } from 'react';

import { MathComponent } from 'mathjax-react';

import { Page } from '../../components/Page';
import { DefaultSidebar } from '../../components/Sidebar';
import { CodeRegion } from '../../components/CodeRegion';

import BooleanSat from '../../res/boolean-sat.raw';

const code1 = `const clauses = [
  [1, -2],
  [-1, 2],
];

const solution = satSolve(2, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log(solution);
}`;

const code2 = `function translated(x1, x2) {
  return (x1 || !x2) && (!x1 || x2);
}

console.log(translated(false, false));`;

const code3 = `const clauses = [
  [1],
  [-1],
];

const solution = satSolve(1, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log(solution);
}`;

export const CmTest = ():ReactElement => {
  return (
    <Page sidebar={ DefaultSidebar }>
      <h2>A title</h2>
      <p>
        SAT Solvers are useful tools which can solve a wide variety of problems&mdash; provided they are in the correct format.
      </p>
      <CodeRegion
        code={ code1 }
        codeHeight='16em'
        hiddenPrelude={ BooleanSat }
      />
      <p>
        The clauses in the above program can be translated to the following:
      </p>
      <MathComponent tex={ String.raw`(x_1 \vee \neg x_2 ) \wedge (\neg x_1 \vee x_2 )` } />
      <p>
        If you are unfamiliar with mathematical notation, the above may be difficult to read.  The character&nbsp;
        <MathComponent display={ false } tex={ String.raw`\vee` } />&nbsp;
        means "or," the character&nbsp;
        <MathComponent display={ false } tex={ String.raw`\wedge` } />&nbsp;
        means "and," the character&nbsp;
        <MathComponent display={ false } tex={ String.raw`\neg` } />&nbsp;
        means "not," and lastly&nbsp;
        <MathComponent display={ false } tex={ String.raw`x_1` } />&nbsp;
        and&nbsp;
        <MathComponent display={ false } tex={ String.raw`x_2` } />&nbsp;
        represent two "literals" which can be either <code>true</code> or <code>false</code>. You can think of literals like boolean variables.
      </p>
      <p>
        It might be easier to make sense of this if we translated it back into a computer language:
      </p>
      <CodeRegion
        code={ code2 }
        codeHeight='9em'
      />
      <p>
        Here <code>translated</code> is a function which takes in two boolean variables, much like how in the mathematical notation above we had two literals.  If <code>translated</code> returns <code>true</code>, the problem is considered "satisfied."  If instead <code>false</code> is returned, the problem is considered "unsatisfied."
      </p>
      <p>
        This brings us back to SAT Solvers.  SAT Solvers find a combination of assignments to literals which satisfy given problems, or let us know that a problem is not satisfiable.
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
        The first clause says that the first literal must be <code>true</code>. The second clause says that the first literal must be <code>false</code>. Regardless of whether we set the first literal to <code>true</code> or <code>false</code> one of the clauses will not hold.  This means the problem is not satisfiable.
      </p>
    </Page>
  );
};

