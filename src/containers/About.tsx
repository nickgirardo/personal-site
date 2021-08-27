import { ReactElement } from 'react';

import { Page, BodyType } from '../components/Page';
import { DefaultItems, NavigationType } from '../components/Navigation';

export const About = ():ReactElement =>
  <Page
    navItems={ DefaultItems }
    navType={ NavigationType.Responsive }
    bodyType={ BodyType.SidebarResponsive }
  >
    All about me here
  </Page>;
