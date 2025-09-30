import { DatedAttributes } from '../types';

export type ArticleAttributes = DatedAttributes & {
  title: string;
  body: string;
};

export type ArticleCreationAttributes = Partial<DatedAttributes> & {
  title: string;
  body: string;
};

export const PUBLIC_ARTICLE_ATTRIBUTES = [
  'id',
  'title',
  'body', 
] as const;

export type PublicArticleAttributes = Pick<ArticleAttributes, typeof PUBLIC_ARTICLE_ATTRIBUTES[number]>;

export const PUBLIC_ARTICLE_CREATION_ATTRIBUTES = [

  'title',
  'body', 
] as const;

export type PublicArticleCreationAttributes = Pick<ArticleCreationAttributes, typeof PUBLIC_ARTICLE_CREATION_ATTRIBUTES[number]>;
