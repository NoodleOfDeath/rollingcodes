import Parser from 'rss-parser';

/**
 * RSS Feed Fetcher Service
 * Fetches and parses RSS feeds from AI news sources
 */
export class RSSFetcher {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['media:content', 'content:encoded', 'description']
      }
    });

    // Default AI news RSS feeds
    this.feeds = [
      'https://techcrunch.com/tag/artificial-intelligence/feed/',
      'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
      'https://www.artificialintelligence-news.com/feed/',
      'https://venturebeat.com/category/ai/feed/',
      'https://www.technologyreview.com/topic/artificial-intelligence/feed',
      'https://www.wired.com/feed/tag/ai/latest/rss',
    ];
  }

  /**
   * Add custom RSS feed URLs
   * @param {string[]} feedUrls - Array of RSS feed URLs
   */
  addFeeds(feedUrls) {
    this.feeds.push(...feedUrls);
  }

  /**
   * Fetch articles from a single RSS feed
   * @param {string} feedUrl - RSS feed URL
   * @returns {Promise<Object[]>} Parsed feed items
   */
  async fetchFeed(feedUrl) {
    try {
      const feed = await this.parser.parseURL(feedUrl);
      return feed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        creator: item.creator || feed.title,
        content: item['content:encoded'] || item.content || item.description,
        summary: item.contentSnippet || item.summary,
        categories: item.categories || [],
        source: feed.title,
        guid: item.guid
      }));
    } catch (error) {
      console.error(`Error fetching feed ${feedUrl}:`, error.message);
      return [];
    }
  }

  /**
   * Fetch articles from all configured RSS feeds
   * @param {number} hoursAgo - Only fetch articles from the last N hours (default: 24)
   * @returns {Promise<Object[]>} All fetched articles
   */
  async fetchAllFeeds(hoursAgo = 24) {
    const cutoffDate = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    const feedPromises = this.feeds.map(feed => this.fetchFeed(feed));
    const feedResults = await Promise.all(feedPromises);

    // Flatten and filter by date
    const allArticles = feedResults
      .flat()
      .filter(article => {
        const articleDate = new Date(article.pubDate);
        return articleDate >= cutoffDate;
      })
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Deduplicate by title similarity (simple approach)
    const uniqueArticles = this.deduplicateArticles(allArticles);

    return uniqueArticles;
  }

  /**
   * Remove duplicate articles based on title similarity
   * @param {Object[]} articles - Array of articles
   * @returns {Object[]} Deduplicated articles
   */
  deduplicateArticles(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const normalized = article.title.toLowerCase().replace(/[^\w\s]/g, '');
      if (seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    });
  }

  /**
   * Get articles grouped by category/topic
   * @param {Object[]} articles - Array of articles
   * @returns {Object} Articles grouped by detected topics
   */
  categorizeArticles(articles) {
    const categories = {
      'AI Research': [],
      'Industry News': [],
      'AI Safety & Ethics': [],
      'Products & Tools': [],
      'Policy & Regulation': [],
      'Other': []
    };

    articles.forEach(article => {
      const text = `${article.title} ${article.summary}`.toLowerCase();

      if (text.match(/research|paper|study|breakthrough|model|training|arxiv/)) {
        categories['AI Research'].push(article);
      } else if (text.match(/openai|anthropic|google|microsoft|meta|startup|funding|acquisition/)) {
        categories['Industry News'].push(article);
      } else if (text.match(/safety|ethics|bias|regulation|risk|alignment/)) {
        categories['AI Safety & Ethics'].push(article);
      } else if (text.match(/product|tool|app|feature|release|launch/)) {
        categories['Products & Tools'].push(article);
      } else if (text.match(/policy|law|government|regulation|senate|congress/)) {
        categories['Policy & Regulation'].push(article);
      } else {
        categories['Other'].push(article);
      }
    });

    // Remove empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([_, articles]) => articles.length > 0)
    );
  }
}
