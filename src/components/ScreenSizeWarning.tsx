import { ReactElement, ReactNode } from 'react';

import '../styles/_screen-size-warning.scss';

interface Props {
  children: ReactNode,
}

export const ScreenSizeWarning = ({ children }: Props): ReactElement  => (
  <aside className='screen-size-warning'>
    { children }
  </aside>
);
