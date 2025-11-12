# RollingCodes Backend - AI Article Generator

Automated service for generating daily AI news digest articles using LLM summarization of RSS feeds.

## Features

- Fetches AI news from multiple RSS sources
- Categorizes articles by topic (Research, Industry News, Safety & Ethics, etc.)
- Generates synthesized digest articles using LLM (Claude or GPT-4)
- Outputs articles in YAML format compatible with the RollingCodes web frontend
- Supports both Anthropic Claude and OpenAI APIs
- Configurable via environment variables

## Installation

```bash
cd src/backend
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your LLM API credentials:

```env
# For Anthropic Claude (recommended)
LLM_ENDPOINT=https://api.anthropic.com/v1/messages
LLM_API_KEY=your_anthropic_api_key_here
LLM_MODEL=claude-3-5-sonnet-20241022

# For OpenAI
# LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
# LLM_API_KEY=your_openai_api_key_here
# LLM_MODEL=gpt-4-turbo-preview
```

## Usage

### Generate Daily Digest

Generate and save a daily AI news digest:

```bash
npm start
```

### Dry Run Mode

Preview the generated article without saving:

```bash
npm start -- --dry-run
```

### Custom Time Range

Fetch news from the last N hours:

```bash
npm start -- --hours=48
```

### Development Mode

Run with auto-reload on file changes:

```bash
npm run dev
```

## Architecture

### Services

#### `services/rss-fetcher.js`
- Fetches articles from AI news RSS feeds
- Deduplicates and filters by date
- Categorizes articles by topic

#### `services/article-generator.js`
- Constructs prompts from news items
- Calls LLM API (Anthropic or OpenAI)
- Generates article metadata (title, tags, reading time)
- Formats output as YAML
- Saves articles to the web app's public directory

### Main Orchestrator

`index.js` ties everything together:
1. Validates environment configuration
2. Fetches news via RSS
3. Categorizes and deduplicates articles
4. Generates article content via LLM
5. Saves to output directory

## Output Format

Articles are saved as YAML files in the format:

```yaml
- title: |
    Article Title Here
- author: Claude
- readtime: 6 minutes
- tags: AI News, Daily Digest, Industry
- content: |
    Article content in markdown...
```

Filename format: `YYYY-MM-DD.HHmmEST-ai-daily-digest.yml`

## RSS Feeds

Default AI news sources:
- TechCrunch AI
- The Verge AI
- AI News
- VentureBeat AI
- MIT Technology Review
- Wired AI

To add custom feeds, modify `services/rss-fetcher.js` or extend the `RSSFetcher` class.

## Scheduling

To run daily automation, set up a cron job:

```bash
# Run every day at 9 AM
0 9 * * * cd /path/to/rollingcodes/src/backend && npm start
```

Or use GitHub Actions (see `.github/workflows/` in project root).

## Development

### Project Structure

```
src/backend/
├── index.js                  # Main orchestrator
├── services/
│   ├── rss-fetcher.js       # RSS feed fetching and categorization
│   └── article-generator.js # LLM-based article generation
├── package.json
├── .env.example
└── README.md
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LLM_ENDPOINT` | LLM API endpoint URL | Required |
| `LLM_API_KEY` | API key for authentication | Required |
| `LLM_MODEL` | Model to use | `claude-3-5-sonnet-20241022` |
| `OUTPUT_DIR` | Output directory for articles | `../web/public/articles` |
| `DEBUG` | Enable verbose logging | `false` |

## Troubleshooting

### API Rate Limits

If you hit rate limits, adjust the time range or reduce the number of RSS feeds.

### Missing Articles

Check that:
- RSS feeds are accessible
- Date range includes recent articles
- Environment variables are correctly configured

### LLM Errors

Ensure:
- API key is valid
- Endpoint URL is correct
- Model name matches your API provider

## License

MIT
