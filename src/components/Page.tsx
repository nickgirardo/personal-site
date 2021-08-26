import { ReactElement, ReactNode } from 'react';

import '../styles/_page.scss';

interface Props {
  sidebar?: () => ReactElement,
  children: ReactNode,
}

export const Page = (props: Props): ReactElement =>
  <div id='page'>
    { props.sidebar && <props.sidebar /> }
    <main id='main-content' className={ props.sidebar && 'with-sidebar' }>
      { props.children }
    </main>
  </div>;
