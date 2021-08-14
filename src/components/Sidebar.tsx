import { ReactNode, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import '../styles/_sidebar.scss';

interface Props {
  children?: ReactNode,
}

const DefaultItems = () =>
  <>
    <Link to='/' >Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/test'>Test</Link>
  </>

export const Sidebar = (props: Props): ReactElement =>
  <div id='sidebar'>
    <div id='sidebar-name'>Nick Girardo</div>
    <div id='sidebar-items'>
      { props.children }
    </div>
  </div>;

export const DefaultSidebar = (): ReactElement =>
  <Sidebar><DefaultItems /></Sidebar>;
