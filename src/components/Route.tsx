import { ReactElement, ReactNode } from 'react';

import { Route as BaseRoute } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Props {
  path: string,
  title: string,
  children: ReactNode,
};

export const Route = ({ path, title, children }: Props): ReactElement => {
  return <BaseRoute path={ path }>
    <Helmet>
      <title>{ title } &mdash; Nick Girardo</title>
    </Helmet>
    { children }
  </BaseRoute>
}
