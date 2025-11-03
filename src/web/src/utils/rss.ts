import Parser from 'rss-parser';

export type RSSNewsItem = {
  title: string;
  link: string;
  pubDate: Date;
  content: string;
  source: string;
};

const parser = new Parser({ customFields: { item: ['description', 'content:encoded'] } });

const RSS_FEEDS = [
  'https://www.artificialintelligence-news.com/feed/',
  'https://www.technologyreview.com/feed/',
  'https://venturebeat.com/category/ai/feed/',
];

export async function getAINews(limit: number = 10): Promise<RSSNewsItem[]> {
  try {
    const allItems: RSSNewsItem[] = [];

    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);
        const sourceName = feed.title || new URL(feedUrl).hostname;

        const items = feed.items.slice(0, 5).map((item) => ({
          content: item.contentSnippet || item.content || '',
          link: item.link || '',
          pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: sourceName,
          title: item.title || '',
        }));

        allItems.push(...items);
      } catch (error) {
        console.error(`Error fetching feed ${feedUrl}:`, error);
      }
    }

    // Sort by date, newest first
    allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    return allItems.slice(0, limit);
  } catch (error) {
    console.error('Error fetching AI news:', error);
    return [];
  }
}
