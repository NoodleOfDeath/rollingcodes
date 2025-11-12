# RollingCodes

[![Web Client CI](https://github.com/NoodleOfDeath/rollingcodes/actions/workflows/web-ci.yaml/badge.svg)](https://github.com/NoodleOfDeath/rollingcodes/actions/workflows/web-ci.yaml)
[![Backend Service](https://img.shields.io/badge/backend-service-blue.svg)](src/backend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, AI-powered technical blog platform with automated content generation. Built as a template for developers who want to run their own tech publication with minimal overhead.

## Overview

RollingCodes is a full-stack blogging platform that combines a Next.js web frontend with automated backend services for AI-driven content generation. The platform demonstrates modern web architecture patterns, LLM integration, and automated publishing workflows.

**Key Features:**
- 📰 Next.js-based static blog with markdown/YAML content
- 🤖 Automated AI news digests using LLM summarization
- 📡 RSS feed integration for content aggregation
- 🎨 Clean, responsive UI with TypeScript
- 🔄 CI/CD pipelines for continuous deployment
- 📊 Extensible architecture for additional services

## Architecture

```
rollingcodes/
├── src/
│   ├── web/          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/        # Next.js pages
│   │   │   └── utils/        # Utilities (RSS, etc.)
│   │   └── public/
│   │       ├── articles/     # Article content (YAML)
│   │       └── authors.yaml  # Author metadata
│   │
│   └── backend/      # Node.js automation services
│       ├── services/
│       │   ├── rss-fetcher.js      # RSS feed aggregation
│       │   └── article-generator.js # LLM-based content generation
│       └── index.js  # Main service orchestrator
│
└── .github/
    └── workflows/    # GitHub Actions CI/CD
```

## Components

### Web Frontend (`src/web`)

Next.js-based static site featuring:
- Server-side rendered blog posts
- RSS feed integration
- Responsive design
- TypeScript for type safety
- YAML-based content management

**Tech Stack:** Next.js, React, TypeScript, TailwindCSS

[View Web Documentation →](src/web/README.md)

### Backend Services (`src/backend`)

Automated content generation pipeline:
- Fetches AI news from RSS feeds
- Categorizes and deduplicates articles
- Generates synthesized digest articles via LLM
- Outputs YAML files for web frontend

**Tech Stack:** Node.js, Anthropic/OpenAI APIs, RSS Parser

[View Backend Documentation →](src/backend/README.md)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- LLM API key (Anthropic Claude or OpenAI)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/NoodleOfDeath/rollingcodes.git
cd rollingcodes
```

2. **Install web dependencies:**
```bash
cd src/web
npm install
```

3. **Install backend dependencies:**
```bash
cd ../backend
npm install
cp .env.example .env
# Edit .env with your LLM API credentials
```

### Development

**Run the web frontend:**
```bash
cd src/web
npm run dev
```
Visit http://localhost:3000

**Generate an article:**
```bash
cd src/backend
npm start
```

## Use Cases

This project serves as a template for:

### Technical Blogs
Start your own AI/tech publication with automated daily digests

### Content Aggregation
Collect and synthesize news from multiple sources using LLMs

### Automation Workflows
Example of integrating LLMs into content pipelines

### Next.js Patterns
Reference implementation for static blog architecture

### CI/CD Demonstrations
Working examples of GitHub Actions workflows

## Deployment

### Web Frontend

The web app deploys automatically via GitHub Actions on push to `main`:
- Builds static site
- Deploys to hosting (Vercel, Netlify, etc.)

### Backend Service

Run as a scheduled job:
- **Cron:** Daily article generation
- **GitHub Actions:** Scheduled workflow
- **Docker:** Containerized service (future)

## Configuration

### Environment Variables

**Backend (`src/backend/.env`):**
```env
LLM_ENDPOINT=https://api.anthropic.com/v1/messages
LLM_API_KEY=your_api_key
LLM_MODEL=claude-3-5-sonnet-20241022
OUTPUT_DIR=../web/public/articles
```

**Web:** Configuration in `next.config.js`

## Content Management

Articles are stored as YAML files in `src/web/public/articles/`:

```yaml
- title: |
    Your Article Title
- author: Author Name
- readtime: 5 minutes
- tags: AI, Tech, Industry
- content: |
    Markdown content here...
```

Add authors in `src/web/public/authors.yaml`.

## Contributing

This is a template project designed for forking and customization. Feel free to:
- Fork and customize for your own blog
- Submit PRs for bug fixes
- Open issues for feature suggestions
- Use as reference for your own projects

## Roadmap

- [ ] Worker services for background processing
- [ ] API endpoints for dynamic content
- [ ] Admin dashboard for content management
- [ ] Docker compose for local development
- [ ] Additional LLM integrations
- [ ] Analytics and metrics

## License

MIT License - see [LICENSE](LICENSE) for details

## Credits

Created by [Thom Morgan](https://github.com/noodleofdeath)

Automated articles by [Claude](https://claude.ai) (Anthropic)

---

**Built with modern tools. Designed for developers.**

