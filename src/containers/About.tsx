import { ReactElement } from 'react';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const About = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    All about me here
  </Page>;
