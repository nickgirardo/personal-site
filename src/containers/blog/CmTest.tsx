import { ReactElement } from 'react';

import { Page } from '../../components/Page';
import { DefaultSidebar } from '../../components/Sidebar';
import { CodeRegion } from '../../components/CodeRegion';

import BooleanSat from '../../res/boolean-sat.raw';

const code = `const clauses = [
  [1, -2],
  [-1, 2],
];

const solution = satSolve(2, clauses);
if (!solution) {
  console.log('No solutions :(');
} else {
  console.log(solution);
}`;

export const CmTest = ():ReactElement => {
  return (
    <Page sidebar={ DefaultSidebar }>
      <h2>A title</h2>
      <CodeRegion
        code={ code }
        codeHeight='15em'
        hiddenPrelude={ BooleanSat }
      />
      <p> A paragraph all about something </p>
      <CodeRegion
        code={ code }
        codeHeight='15em'
        hiddenPrelude={ BooleanSat }
      />
    </Page>
  );
};

