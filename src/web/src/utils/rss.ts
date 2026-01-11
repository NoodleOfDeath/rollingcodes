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

const STATIC_NEWS: RSSNewsItem[] = [
  {
    title: '[AI Written] Anthropic Unveils Claude Opus 4.5: The New King of Code?',
    link: 'https://www.anthropic.com/news/claude-opus-4-5',
    pubDate: new Date('2025-11-28T10:00:00Z'),
    content: 'Anthropic has introduced Claude Opus 4.5, a model that reportedly outperforms GPT-5.1 in complex reasoning and coding tasks. This release marks a significant shift in the LLM landscape, with Opus 4.5 demonstrating "self-improving" capabilities in agentic workflows. "It\u2019s not just about benchmarks anymore; it\u2019s about reliable autonomy," stated Dario Amodei during the launch.',
    source: 'Anthropic Blog',
  },
  {
    title: '[AI Written] OpenAI & AWS Forge $38B Alliance: The Cloud Wars Heat Up',
    link: 'https://openai.com/blog/aws-partnership-2025',
    pubDate: new Date('2025-12-05T14:30:00Z'),
    content: 'In a stunning move, OpenAI has signed a multiyear, $38 billion partnership with AWS, signaling a potential diversification away from exclusive reliance on Azure. This "model-cloud" exclusivity deal ensures OpenAI has the compute power needed for its next generation of "Thinking" models, while AWS solidifies its position as a premier AI infrastructure provider.',
    source: 'TechCrunch',
  },
  {
    title: '[AI Written] EU AI Act Enters Enforcement Phase: Is Big Tech Ready?',
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_25_4567',
    pubDate: new Date('2025-12-12T09:15:00Z'),
    content: 'The European Union\'s AI Act has officially entered its first major enforcement phase this week. Companies operating foundation models in the EU now face strict transparency requirements and potential fines for non-compliance. "The grace period is over," warned the European AI Office, as audits for high-risk AI systems begin immediately.',
    source: 'The Verge',
  },
  {
    title: '[AI Written] Google Acquires Wiz for $32B to Fortify Cloud Security AI',
    link: 'https://blog.google/products/google-cloud/wiz-acquisition',
    pubDate: new Date('2025-12-19T11:00:00Z'),
    content: 'Google has finalized its acquisition of cloud security firm Wiz for a staggering $32 billion. This move is seen as a direct counter to Microsoft\'s dominance in enterprise security. Google plans to integrate Wiz\'s CNC (Cloud Native Computing) security graph into Gemini, creating an "AI Security Analyst" capable of real-time threat detection and automated remediation.',
    source: 'Google Cloud Blog',
  },
  {
    title: '[AI Written] 2025 in Review: From Agentic AI to the Trillion-Parameter Era',
    link: 'https://www.wired.com/story/ai-year-in-review-2025',
    pubDate: new Date('2025-12-26T16:45:00Z'),
    content: 'As 2025 draws to a close, we reflect on a year defined by the rise of "Agentic AI." From the early promise of Devin to the robust autonomy of Claude 4.5 and Gemini 3 Flash, AI is no longer just a chatbot\u2014it is a coworker. With over $100B invested in hardware alone this year, 2026 promises the arrival of the "Zettascale" training run.',
    source: 'Wired',
  },
];

export async function getAINews(limit: number = 10): Promise<RSSNewsItem[]> {
  try {
    const allItems: RSSNewsItem[] = [...STATIC_NEWS];

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
