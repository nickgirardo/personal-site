import { ReactElement } from 'react';

import { Route as BaseRoute } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Props {
  path: string,
  title: string,
  Component: () => ReactElement,
};

export const Route = (props: Props): ReactElement => {
  return <BaseRoute path={ props.path }>
    <Helmet>
      <title>{ props.title } &mdash; Nick Girardo</title>
    </Helmet>
    <props.Component />
  </BaseRoute>
}
