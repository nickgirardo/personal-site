import { ReactElement, ReactNode } from 'react';

import '../styles/_page.scss';

interface Props {
  sidebar?: () => ReactElement,
  header?: () => ReactElement,
  children: ReactNode,
}

export const Page = (props: Props): ReactElement =>
  <div id='page'>
    { props.sidebar && <props.sidebar /> }
    { props.header && <props.header /> }
    <main id='main-content' className={ props.sidebar ? 'with-sidebar' : 'no-sidebar' }>
      { props.children }
    </main>
  </div>;
