import React from 'react';

import { Markdown } from './Markdown';

import { PublicArticleAttributes } from '~/api';

export const Article = (props: PublicArticleAttributes) => {
  return (
    <article>
      <h1>{props.title}</h1>
      <Markdown>{props.body}</Markdown>
    </article>
  );
};