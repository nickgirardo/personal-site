import { ReactElement } from 'react';

import { Route as BaseRoute } from 'react-router-dom';

interface Props {
  path: string,
  title: string,
  Component: () => ReactElement,
};

export const Route = (props: Props): ReactElement => {
  return <BaseRoute path={ props.path }>
    <props.Component />
  </BaseRoute>
}
