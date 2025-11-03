import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import { getAuthorByName } from './authors';

import type { Article } from '~/components/Article';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.yml'))
    .map((fileName) => fileName.replace(/\.yml$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.yml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = yaml.load(fileContents) as any;

    // Parse date from slug (format: 2025-11-03.0839EST-title)
    const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    const date = dateMatch
      ? new Date(
        parseInt(dateMatch[1], 10),
        parseInt(dateMatch[2], 10) - 1,
        parseInt(dateMatch[3], 10)
      )
      : new Date();

    const authorName = Array.isArray(data) && data[1]?.author ? data[1].author : data.author || '';
    const authorData = getAuthorByName(authorName);

    return {
      author: authorName,
      authorData: authorData || undefined,
      content: Array.isArray(data) && data[4]?.content ? data[4].content : data.content || '',
      date,
      readtime: Array.isArray(data) && data[2]?.readtime ? data[2].readtime : data.readtime || '',
      slug,
      tags: Array.isArray(data) && data[3]?.tags ? data[3].tags : data.tags || '',
      title: Array.isArray(data) && data[0]?.title ? data[0].title : data.title || '',
    };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return articles;
}
