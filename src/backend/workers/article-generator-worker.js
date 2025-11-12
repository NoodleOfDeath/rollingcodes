#!/usr/bin/env node
import 'dotenv/config';
import { RSSFetcher } from './services/rss-fetcher.js';
import { ArticleGenerator } from './services/article-generator.js';
import { createStorage } from './lib/storage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main service orchestrator for automated AI article generation
 */
class AIArticleService {
  constructor() {
    this.validateEnvironment();

    // Initialize storage adapter
    this.storage = createStorage({
      type: process.env.STORAGE_TYPE,
      baseDir: process.env.STORAGE_BASE_DIR || path.join(__dirname, '../web/public/articles'),
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      prefix: process.env.S3_PREFIX,
      endpoint: process.env.S3_ENDPOINT,
    });

    this.rssFetcher = new RSSFetcher();
    this.articleGenerator = new ArticleGenerator(
      process.env.LLM_ENDPOINT,
      process.env.LLM_API_KEY,
      this.storage
    );
  }

  /**
   * Validate required environment variables
   */
  validateEnvironment() {
    const required = ['LLM_ENDPOINT', 'LLM_API_KEY'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      console.error(`Missing required environment variables: ${missing.join(', ')}`);
      console.error('Please check your .env file');
      process.exit(1);
    }
  }

  /**
   * Generate daily AI digest article
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Path to generated article
   */
  async generateDailyDigest(options = {}) {
    const {
      hoursAgo = 24,
      customFeeds = [],
      dryRun = false
    } = options;

    try {
      console.log('🔍 Fetching AI news from RSS feeds...');

      // Add any custom feeds
      if (customFeeds.length > 0) {
        this.rssFetcher.addFeeds(customFeeds);
      }

      // Fetch all news articles
      const articles = await this.rssFetcher.fetchAllFeeds(hoursAgo);
      console.log(`📰 Found ${articles.length} articles from the last ${hoursAgo} hours`);

      if (articles.length === 0) {
        console.log('⚠️  No articles found. Exiting.');
        return null;
      }

      // Categorize articles
      const categorized = this.rssFetcher.categorizeArticles(articles);
      console.log('\n📊 Articles by category:');
      for (const [category, items] of Object.entries(categorized)) {
        console.log(`   ${category}: ${items.length}`);
      }

      // Generate article
      console.log('\n✍️  Generating article with LLM...');
      const articleMetadata = await this.articleGenerator.generateArticle(categorized);

      console.log(`\n✅ Article generated:`);
      console.log(`   Title: ${articleMetadata.title}`);
      console.log(`   Reading time: ${articleMetadata.readtime}`);
      console.log(`   Tags: ${articleMetadata.tags}`);

      // Save article
      if (!dryRun) {
        const filepath = await this.articleGenerator.saveArticle(
          articleMetadata,
          this.outputDir
        );
        console.log(`\n💾 Article saved to: ${filepath}`);
        return filepath;
      } else {
        console.log('\n🔍 Dry run mode - article not saved');
        console.log('\n--- Article Preview ---');
        console.log(this.articleGenerator.formatAsYAML(articleMetadata));
        return null;
      }
    } catch (error) {
      console.error('\n❌ Error generating article:', error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      throw error;
    }
  }

  /**
   * Run the service
   */
  async run() {
    console.log('🤖 AI Article Generator Service\n');

    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const hoursArg = args.find(arg => arg.startsWith('--hours='));
    const hoursAgo = hoursArg ? parseInt(hoursArg.split('=')[1]) : 24;

    try {
      await this.generateDailyDigest({ hoursAgo, dryRun });
      console.log('\n✨ Done!\n');
    } catch (error) {
      process.exit(1);
    }
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const service = new AIArticleService();
  service.run();
}

export { AIArticleService };
