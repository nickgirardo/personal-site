import { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Page } from '../components/Page';
import { DefaultSidebar } from '../components/Sidebar';

export const Test = ():ReactElement =>
  <Page sidebar={ DefaultSidebar }>
    <h2>Test content</h2>
    <Link to='/blog/cm-test'>Test Blog Post</Link>
  </Page>;
