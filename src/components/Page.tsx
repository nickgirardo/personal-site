import { ReactElement, ReactNode } from 'react';

interface Props {
  sidebar?: () => ReactElement,
  children: ReactNode,
}

export const Page = (props: Props): ReactElement =>
  <div id='page'>
    { props.sidebar && <props.sidebar /> }
    { props.children }
  </div>;
