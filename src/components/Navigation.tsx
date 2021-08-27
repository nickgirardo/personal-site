import { ReactElement } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import '../styles/_navigation.scss';

export enum NavigationType {
  Header,
  Sidebar,
  Responsive,
}

interface Props {
  kind: NavigationType
  items?: () => ReactElement,
}

export const DefaultItems = () =>
  <>
    <Link to='/' >Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/blog'>Blog</Link>
  </>

export const Navigation = (props: Props): ReactElement => {
  const classes = cn(
    'navigation',
    props.kind === NavigationType.Header && 'header',
    props.kind === NavigationType.Sidebar && 'sidebar',
    props.kind === NavigationType.Responsive && 'responsive',
  );

  return (
    <div className={ classes }>
      <div className='navigation-name'>Nick Girardo</div>
      <div className='navigation-items'>
        { props.items && <props.items /> }
      </div>
    </div>
  );
};
