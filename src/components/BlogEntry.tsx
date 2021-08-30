import { ReactElement, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { dateToString } from '../util';

import '../styles/_blog-entry.scss';

interface Props {
  name: string,
  link: LinkProps['to'],
  pubDate: Date,
  children: ReactNode,
}

export const BlogEntry = ({ link, name, pubDate, children }: Props): ReactElement => {
  return (
    <div className='blog-entry'>
      <Link to={ link }>{ name }</Link>
      <time dateTime={ pubDate.toISOString() }>{ dateToString(pubDate) }</time>
      { children }
    </div>
  );
}
