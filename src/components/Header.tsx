import { ReactNode, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import '../styles/_header.scss';

interface Props {
  children?: ReactNode,
}

const DefaultItems = () =>
  <>
    <Link to='/' >Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/blog'>Blog</Link>
  </>

export const Header = (props: Props): ReactElement =>
  <div id='header'>
    <div id='header-name'>Nick Girardo</div>
    <div id='header-items'>
      { props.children }
    </div>
  </div>;

export const DefaultHeader = (): ReactElement =>
  <Header><DefaultItems /></Header>;
