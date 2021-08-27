import { ReactElement, ReactNode } from 'react';
import cn from 'classnames';

import '../styles/_page.scss';

import { Navigation, NavigationType } from './Navigation';

export enum BodyType {
  Article,
  // TODO proper name
  SidebarResponsive,
}

interface Props {
  navItems?: () => ReactElement,
  navType: NavigationType,
  bodyType: BodyType,
  children: ReactNode,
}

export const Page = (props: Props): ReactElement => {
  const classes = cn(
    props.bodyType === BodyType.Article && 'article',
    props.bodyType === BodyType.SidebarResponsive && 'sidebar-responsive',
  );

  return (
    <div id='page'>
      <Navigation
        items={ props.navItems }
        kind={ props.navType }
      />
      <main id='main-content' className={ classes }>
        { props.children }
      </main>
    </div>
  );
}
