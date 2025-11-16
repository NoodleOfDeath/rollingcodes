#!/usr/bin/env node
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createStorage } from '../lib/storage.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize storage
const storage = createStorage();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const {
      limit = 50,
      offset = 0,
      author,
      tags,
      orderBy = 'published_at',
      order = 'DESC'
    } = req.query;

    const articles = await storage.list({
      limit: parseInt(limit),
      offset: parseInt(offset),
      author,
      tags: tags ? tags.split(',') : null,
      orderBy,
      order
    });

    res.json({
      articles,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        count: articles.length
      }
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get single article by slug
app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await storage.getBySlug(slug);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Create new article (protected - requires API key)
app.post('/api/articles', authenticateAPIKey, async (req, res) => {
  try {
    const article = req.body;

    // Validate required fields
    if (!article.slug || !article.title || !article.author || !article.content) {
      return res.status(400).json({
        error: 'Missing required fields: slug, title, author, content'
      });
    }

    const saved = await storage.save(article);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// Update article (protected - requires API key)
app.patch('/api/articles/:slug', authenticateAPIKey, async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const updated = await storage.update(slug, updates);

    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article (protected - requires API key)
app.delete('/api/articles/:slug', authenticateAPIKey, async (req, res) => {
  try {
    const { slug } = req.params;
    const deleted = await storage.delete(slug);

    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// API Key authentication middleware
function authenticateAPIKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'Server API key not configured' });
  }

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 RollingCodes API server running on port ${port}`);
  console.log(`   Health check: http://localhost:${port}/health`);
  console.log(`   Articles API: http://localhost:${port}/api/articles`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await storage.close?.();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server...');
  await storage.close?.();
  process.exit(0);
});
