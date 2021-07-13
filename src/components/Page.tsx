import { ReactElement, ReactNode } from 'react';

interface Props {
  sidebar?: () => ReactElement,
  children: ReactNode,
}

export const Page = (props: Props): ReactElement =>
  <div id='page'>
    { props.sidebar && <props.sidebar /> }
    <div id='main-content' className={ props.sidebar && 'with-sidebar' }>
      { props.children }
    </div>
  </div>;
