import { ReactElement } from 'react';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const Home = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    Home
  </Page>;
