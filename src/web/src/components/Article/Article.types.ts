import type { Author } from '~/utils/authors';

export type Article = {
  author: string;
  authorData?: Author;
  content: string;
  date: Date;
  readtime: string;
  slug: string;
  tags: string;
  title: string;
};
