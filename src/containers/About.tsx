import { ReactElement } from 'react';

import { Page, BodyType } from '../components/Page';
import { DefaultItems, NavigationType } from '../components/Navigation';

import '../styles/_article.scss';

export const About = ():ReactElement =>
  <Page
    navItems={ DefaultItems }
    navType={ NavigationType.Responsive }
    bodyType={ BodyType.SidebarResponsive }
  >
    <article>
      <p>
        I am a New York-based software engineer specializing in front-end development and web technologies.  Here is my <a href='/resume.pdf'>resume</a>.
      </p>
      <p>
        I am currently interested in full-time or consulting work (preferrably remote).  If you are interested in working with me, you can contact me at <a href="mailto:nickgirardo@gmail.com">nickgirardo@gmail.com</a>.
      </p>
    </article>
  </Page>;
