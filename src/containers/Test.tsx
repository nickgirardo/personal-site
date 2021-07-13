import { ReactElement } from 'react';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const Test = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    Test content
  </Page>;
