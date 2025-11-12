import axios from 'axios';
import yaml from 'js-yaml';
import path from 'path';

/**
 * Article Generator Service
 * Uses LLM to generate AI news summary articles
 */
export class ArticleGenerator {
  constructor(llmEndpoint, apiKey, storage = null) {
    this.llmEndpoint = llmEndpoint;
    this.apiKey = apiKey;
    this.storage = storage;
  }

  /**
   * Generate an article from RSS feed items
   * @param {Object[]} newsItems - Categorized news items
   * @param {Date} date - Publication date
   * @returns {Promise<Object>} Generated article metadata and content
   */
  async generateArticle(newsItems, date = new Date()) {
    const prompt = this.buildPrompt(newsItems);
    const articleContent = await this.callLLM(prompt);

    const metadata = await this.createArticleMetadata(articleContent, newsItems, date);
    return metadata;
  }

  /**
   * Build the LLM prompt from news items
   * @param {Object} categorizedNews - News items grouped by category
   * @returns {string} Formatted prompt
   */
  buildPrompt(categorizedNews) {
    let newsContext = '';

    for (const [category, items] of Object.entries(categorizedNews)) {
      if (items.length === 0) continue;

      newsContext += `\n## ${category}\n\n`;
      items.forEach((item, idx) => {
        newsContext += `${idx + 1}. **${item.title}**\n`;
        newsContext += `   Source: ${item.source}\n`;
        newsContext += `   Published: ${new Date(item.pubDate).toLocaleDateString()}\n`;
        newsContext += `   Link: ${item.link}\n`;
        if (item.summary) {
          newsContext += `   Summary: ${item.summary.substring(0, 200)}...\n`;
        }
        newsContext += '\n';
      });
    }

    return `You are Claude, an AI assistant writing a daily digest article for RollingCodes, a technical blog about AI developments.

Your task is to synthesize the following AI news from the past 24 hours into a compelling, diegetic article that:

1. Has a strong narrative voice - engaging but technical, analytical but accessible
2. Identifies the most important trends and developments
3. Connects the dots between different stories
4. Provides critical analysis and context
5. Follows the RollingCodes style: sharp observations, no hype, focus on what matters
6. Is structured with clear sections (##)
7. Uses markdown hyperlinks in the format [text](url) for references
8. Avoids buzzword bingo - be precise and substantive
9. Includes a compelling closing thought

Target length: 800-1200 words (about 6-8 minutes reading time)

Here are today's AI news stories:
${newsContext}

Please write the article content in markdown format. Do NOT include the title or metadata - only the article body starting with the opening paragraph.

Focus on synthesis rather than summarization. What's the real story here? What patterns emerge? What should readers actually care about?`;
  }

  /**
   * Call the LLM API
   * @param {string} prompt - The prompt to send
   * @returns {Promise<string>} Generated content
   */
  async callLLM(prompt) {
    try {
      // Support for both OpenAI-compatible and Anthropic APIs
      const isAnthropicAPI = this.llmEndpoint.includes('anthropic.com');

      const payload = isAnthropicAPI
        ? {
            model: process.env.LLM_MODEL || 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: [
              { role: 'user', content: prompt }
            ]
          }
        : {
            model: process.env.LLM_MODEL || 'gpt-4-turbo-preview',
            messages: [
              { role: 'system', content: 'You are Claude, a technical AI writer for RollingCodes.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 4096,
            temperature: 0.7
          };

      const headers = isAnthropicAPI
        ? {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          }
        : {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          };

      const response = await axios.post(this.llmEndpoint, payload, { headers });

      // Extract content based on API format
      if (isAnthropicAPI) {
        return response.data.content[0].text;
      } else {
        return response.data.choices[0].message.content;
      }
    } catch (error) {
      console.error('Error calling LLM:', error.response?.data || error.message);
      throw new Error(`LLM API call failed: ${error.message}`);
    }
  }

  /**
   * Generate article title from content
   * @param {string} content - Article content
   * @returns {Promise<string>} Generated title
   */
  async generateTitle(content) {
    const titlePrompt = `Based on the following article about AI developments, generate a compelling, specific title that:
- Is 8-12 words long
- Captures the main theme or most important development
- Uses active voice
- Avoids clickbait or vague language
- Follows the format of technical journalism

Article excerpt:
${content.substring(0, 500)}...

Respond with ONLY the title, nothing else.`;

    try {
      const title = await this.callLLM(titlePrompt);
      return title.trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
    } catch (error) {
      console.error('Error generating title:', error);
      return 'AI Daily Digest: Key Developments in Artificial Intelligence';
    }
  }

  /**
   * Estimate reading time
   * @param {string} content - Article content
   * @returns {number} Reading time in minutes
   */
  estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Extract relevant tags from content
   * @param {string} content - Article content
   * @param {Object} categorizedNews - News categories
   * @returns {string[]} Array of tags
   */
  extractTags(content, categorizedNews) {
    const tags = new Set(['AI News', 'Daily Digest']);

    // Add category-based tags
    const categories = Object.keys(categorizedNews);
    if (categories.includes('AI Research')) tags.add('AI Research');
    if (categories.includes('AI Safety & Ethics')) tags.add('AI Safety');
    if (categories.includes('Policy & Regulation')) tags.add('AI Policy');
    if (categories.includes('Industry News')) tags.add('Industry');

    // Extract company mentions
    const companies = ['OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Meta', 'DeepMind'];
    companies.forEach(company => {
      if (content.includes(company)) tags.add(company);
    });

    return Array.from(tags).slice(0, 6); // Limit to 6 tags
  }

  /**
   * Create article metadata
   * @param {string} content - Generated article content
   * @param {Object} categorizedNews - News categories for tag extraction
   * @param {Date} date - Publication date
   * @returns {Promise<Object>} Article metadata object
   */
  async createArticleMetadata(content, categorizedNews, date) {
    const title = await this.generateTitle(content);
    const readtime = this.estimateReadingTime(content);
    const tags = this.extractTags(content, categorizedNews);
    const slug = this.generateSlug(date);

    return {
      slug,
      title,
      author: 'Claude',
      readtime: `${readtime} minutes`,
      tags,
      content: content.trim(),
      published_at: date
    };
  }

  /**
   * Generate URL slug for the article
   * @param {Date} date - Publication date
   * @returns {string} URL slug
   */
  generateSlug(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}.${hours}${minutes}EST-ai-daily-digest`;
  }

  /**
   * Format article as YAML
   * @param {Object} metadata - Article metadata
   * @returns {string} YAML-formatted article
   */
  formatAsYAML(metadata) {
    return `- title: |\n    ${metadata.title}\n` +
           `- author: ${metadata.author}\n` +
           `- readtime: ${metadata.readtime}\n` +
           `- tags: ${metadata.tags}\n` +
           `- content: |\n` +
           metadata.content.split('\n').map(line => `    ${line}`).join('\n') + '\n';
  }

  /**
   * Generate filename for the article
   * @param {Date} date - Publication date
   * @returns {string} Filename
   */
  generateFilename(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format: YYYY-MM-DD.HHmmEST-slug.yml
    const slug = 'ai-daily-digest';
    return `${year}-${month}-${day}.${hours}${minutes}EST-${slug}.yml`;
  }

  /**
   * Save article using storage adapter
   * @param {Object} metadata - Article metadata
   * @returns {Promise<string>} Path/URL where article was saved
   */
  async saveArticle(metadata) {
    if (!this.storage) {
      throw new Error('Storage adapter not configured');
    }

    const yamlContent = this.formatAsYAML(metadata);
    const filename = this.generateFilename(new Date());

    // Organize articles by author in subdirectories
    const authorSlug = metadata.author.toLowerCase().replace(/\s+/g, '-');
    const filepath = path.join(authorSlug, filename);

    const savedPath = await this.storage.save(filepath, yamlContent);
    return savedPath;
  }
}
