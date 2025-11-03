import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllArticles } from '~/utils/articles';

const generateSitemap = (baseUrl: string): string => {
  const articles = getAllArticles();

  // Static pages
  const staticPages = [
    { loc: '/', priority: '1.0' },
    { loc: '/read/', priority: '0.9' },
  ];

  const staticUrls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('');

  // Dynamic article pages
  const articleUrls = articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/read/${article.slug}/</loc>
    <lastmod>${article.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}${articleUrls}
</urlset>`;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://rollingcodes.com';

  const sitemap = generateSitemap(baseUrl);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate'
  );
  res.status(200).send(sitemap);
}
