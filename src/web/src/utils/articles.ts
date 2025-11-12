import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import { getAuthorByName } from './authors';

import type { Article } from '~/components/Article';

const articlesDirectory = path.join(process.cwd(), 'public/articles');
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Recursively get all article files from the articles directory
 * Supports both flat structure and author subdirectories
 */
function getAllArticleFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively get files from subdirectory
      files.push(...getAllArticleFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.yml')) {
      // Get relative path from base articles directory
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

export function getArticleSlugs(): string[] {
  const files = getAllArticleFiles(articlesDirectory);
  return files.map((file) => file.replace(/\.yml$/, ''));
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

/**
 * Fetch articles from API (for client-side or when API_URL is configured)
 */
export async function fetchArticlesFromAPI(options: {
  limit?: number;
  offset?: number;
  author?: string;
  tags?: string[];
} = {}): Promise<Article[]> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL not configured');
  }

  const params = new URLSearchParams();
  if (options.limit) params.set('limit', options.limit.toString());
  if (options.offset) params.set('offset', options.offset.toString());
  if (options.author) params.set('author', options.author);
  if (options.tags) params.set('tags', options.tags.join(','));

  const response = await fetch(`${API_URL}/api/articles?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const data = await response.json();

  return data.articles.map((article: any) => ({
    ...article,
    date: new Date(article.published_at),
    authorData: getAuthorByName(article.author),
  }));
}

export async function fetchArticleBySlugFromAPI(slug: string): Promise<Article | null> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL not configured');
  }

  const response = await fetch(`${API_URL}/api/articles/${slug}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  const article = await response.json();

  return {
    ...article,
    date: new Date(article.published_at),
    authorData: getAuthorByName(article.author),
  };
}

/**
 * Get all articles - uses API if available, falls back to filesystem
 */
export async function getArticles(options?: Parameters<typeof fetchArticlesFromAPI>[0]): Promise<Article[]> {
  if (API_URL) {
    try {
      return await fetchArticlesFromAPI(options);
    } catch (error) {
      console.warn('API fetch failed, falling back to filesystem:', error);
    }
  }

  // Fallback to filesystem
  return getAllArticles();
}

/**
 * Get article by slug - uses API if available, falls back to filesystem
 */
export async function getArticle(slug: string): Promise<Article | null> {
  if (API_URL) {
    try {
      return await fetchArticleBySlugFromAPI(slug);
    } catch (error) {
      console.warn('API fetch failed, falling back to filesystem:', error);
    }
  }

  // Fallback to filesystem
  return getArticleBySlug(slug);
}
