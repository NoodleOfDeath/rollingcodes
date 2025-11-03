import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

export type AuthorSocials = {
  github?: string;
  linkedin?: string;
  stackoverflow?: string;
  twitter?: string;
  website?: string;
};

export type Author = {
  bio: string;
  name: string;
  socials: AuthorSocials;
};

const authorsFilePath = path.join(process.cwd(), 'public/authors.yaml');

export function getAuthors(): Author[] {
  try {
    const fileContents = fs.readFileSync(authorsFilePath, 'utf8');
    const data = yaml.load(fileContents) as Author[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading authors:', error);
    return [];
  }
}

export function getAuthorByName(name: string): Author | null {
  const authors = getAuthors();
  return authors.find((author) => author.name === name) || null;
}
