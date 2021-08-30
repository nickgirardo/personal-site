import { ReactNode, ReactElement } from 'react';

import '../styles/_equation-block.scss';

interface Props {
  children: ReactNode,
}

export const EquationBlock = ({ children }: Props): ReactElement =>
  <div className='equation-block'>
    { children }
  </div>;
