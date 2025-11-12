import fs from 'fs/promises';
import path from 'path';
import pg from 'pg';
import yaml from 'js-yaml';

const { Pool } = pg;

/**
 * Base Storage Interface
 * All storage adapters must implement these methods
 */
export class StorageAdapter {
  /**
   * Save an article
   * @param {Object} article - Article object with metadata and content
   * @returns {Promise<Object>} Saved article with ID
   */
  async save(article) {
    throw new Error('save() must be implemented by storage adapter');
  }

  /**
   * Get an article by slug
   * @param {string} slug - Article slug
   * @returns {Promise<Object|null>} Article object or null
   */
  async getBySlug(slug) {
    throw new Error('getBySlug() must be implemented by storage adapter');
  }

  /**
   * Get an article by ID
   * @param {number} id - Article ID
   * @returns {Promise<Object|null>} Article object or null
   */
  async getById(id) {
    throw new Error('getById() must be implemented by storage adapter');
  }

  /**
   * List all articles with optional filters
   * @param {Object} options - Query options (limit, offset, author, tags)
   * @returns {Promise<Object[]>} Array of articles
   */
  async list(options = {}) {
    throw new Error('list() must be implemented by storage adapter');
  }

  /**
   * Update an article
   * @param {string} slug - Article slug
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>} Updated article or null
   */
  async update(slug, updates) {
    throw new Error('update() must be implemented by storage adapter');
  }

  /**
   * Delete an article
   * @param {string} slug - Article slug
   * @returns {Promise<boolean>} Success status
   */
  async delete(slug) {
    throw new Error('delete() must be implemented by storage adapter');
  }
}

/**
 * PostgreSQL Storage Adapter
 * Production-ready storage with relational capabilities
 */
export class PostgreSQLStorage extends StorageAdapter {
  constructor(config) {
    super();
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl,
    });
  }

  async save(article) {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO articles (slug, title, author, content, readtime, tags, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug)
        DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          readtime = EXCLUDED.readtime,
          tags = EXCLUDED.tags,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;

      const values = [
        article.slug,
        article.title,
        article.author,
        article.content,
        article.readtime,
        article.tags || [],
        article.published_at || new Date(),
      ];

      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getBySlug(slug) {
    const query = 'SELECT * FROM articles WHERE slug = $1';
    const result = await this.pool.query(query, [slug]);
    return result.rows[0] || null;
  }

  async getById(id) {
    const query = 'SELECT * FROM articles WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async list(options = {}) {
    const {
      limit = 50,
      offset = 0,
      author = null,
      tags = null,
      orderBy = 'published_at',
      order = 'DESC'
    } = options;

    let query = 'SELECT * FROM articles WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (author) {
      query += ` AND author = $${paramCount}`;
      values.push(author);
      paramCount++;
    }

    if (tags && tags.length > 0) {
      query += ` AND tags && $${paramCount}`;
      values.push(tags);
      paramCount++;
    }

    query += ` ORDER BY ${orderBy} ${order} LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    values.push(limit, offset);

    const result = await this.pool.query(query, values);
    return result.rows;
  }

  async update(slug, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    if (fields.length === 0) {
      return null;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');

    const query = `
      UPDATE articles
      SET ${fields.join(', ')}
      WHERE slug = $${paramCount}
      RETURNING *
    `;
    values.push(slug);

    const result = await this.pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(slug) {
    const query = 'DELETE FROM articles WHERE slug = $1 RETURNING *';
    const result = await this.pool.query(query, [slug]);
    return result.rowCount > 0;
  }

  async close() {
    await this.pool.end();
  }
}

/**
 * YAML File Storage Adapter
 * Fallback storage for development or when database is unavailable
 */
export class YAMLFileStorage extends StorageAdapter {
  constructor(baseDir) {
    super();
    this.baseDir = baseDir;
  }

  async save(article) {
    const slug = article.slug;
    const authorSlug = article.author.toLowerCase().replace(/\s+/g, '-');
    const filename = `${slug}.yml`;
    const filepath = path.join(this.baseDir, authorSlug, filename);

    const yamlData = [
      { title: article.title },
      { author: article.author },
      { readtime: article.readtime },
      { tags: Array.isArray(article.tags) ? article.tags.join(', ') : article.tags },
      { content: article.content }
    ];

    const yamlContent = yaml.dump(yamlData);
    const dir = path.dirname(filepath);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filepath, yamlContent, 'utf8');

    return { ...article, id: slug };
  }

  async getBySlug(slug) {
    // Search all author subdirectories for the slug
    const files = await this._getAllFiles();
    const file = files.find(f => f.includes(slug));

    if (!file) return null;

    return await this._readYAMLFile(file, slug);
  }

  async getById(id) {
    return await this.getBySlug(id); // For YAML, ID is the slug
  }

  async list(options = {}) {
    const { limit = 50, offset = 0, author = null } = options;
    const files = await this._getAllFiles();
    const articles = [];

    for (const file of files) {
      const slug = path.basename(file, '.yml');
      const article = await this._readYAMLFile(file, slug);

      if (article && (!author || article.author === author)) {
        articles.push(article);
      }
    }

    // Sort by published_at (parse from slug)
    articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    return articles.slice(offset, offset + limit);
  }

  async update(slug, updates) {
    const article = await this.getBySlug(slug);
    if (!article) return null;

    const updated = { ...article, ...updates };
    return await this.save(updated);
  }

  async delete(slug) {
    const files = await this._getAllFiles();
    const file = files.find(f => f.includes(slug));

    if (!file) return false;

    try {
      await fs.unlink(file);
      return true;
    } catch {
      return false;
    }
  }

  async _getAllFiles() {
    const files = [];

    async function scanDir(dir) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            await scanDir(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.yml')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Directory doesn't exist yet
      }
    }

    await scanDir(this.baseDir);
    return files;
  }

  async _readYAMLFile(filepath, slug) {
    try {
      const content = await fs.readFile(filepath, 'utf8');
      const data = yaml.load(content);

      // Parse date from slug (format: 2025-11-17.1400EST-title)
      const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
      const published_at = dateMatch
        ? new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]))
        : new Date();

      return {
        id: slug,
        slug,
        title: Array.isArray(data) && data[0]?.title ? data[0].title : data.title || '',
        author: Array.isArray(data) && data[1]?.author ? data[1].author : data.author || '',
        readtime: Array.isArray(data) && data[2]?.readtime ? data[2].readtime : data.readtime || '',
        tags: Array.isArray(data) && data[3]?.tags
          ? (typeof data[3].tags === 'string' ? data[3].tags.split(',').map(t => t.trim()) : data[3].tags)
          : (data.tags || []),
        content: Array.isArray(data) && data[4]?.content ? data[4].content : data.content || '',
        published_at,
        created_at: published_at,
        updated_at: published_at,
      };
    } catch (error) {
      console.error(`Error reading YAML file ${filepath}:`, error);
      return null;
    }
  }
}

/**
 * Hybrid Storage Adapter
 * Tries PostgreSQL first, falls back to YAML files if DB unavailable
 */
export class HybridStorage extends StorageAdapter {
  constructor(pgConfig, yamlBaseDir) {
    super();
    this.pgStorage = null;
    this.yamlStorage = new YAMLFileStorage(yamlBaseDir);
    this.pgConfig = pgConfig;
    this.usePostgres = false;
  }

  async _initPostgres() {
    if (this.pgStorage) return;

    try {
      this.pgStorage = new PostgreSQLStorage(this.pgConfig);
      // Test connection
      await this.pgStorage.pool.query('SELECT 1');
      this.usePostgres = true;
      console.log('✅ PostgreSQL storage initialized');
    } catch (error) {
      console.warn('⚠️  PostgreSQL unavailable, falling back to YAML file storage');
      console.warn(`   Reason: ${error.message}`);
      this.usePostgres = false;
    }
  }

  async save(article) {
    await this._initPostgres();
    try {
      if (this.usePostgres) {
        return await this.pgStorage.save(article);
      }
    } catch (error) {
      console.warn('PostgreSQL save failed, falling back to YAML:', error.message);
      this.usePostgres = false;
    }
    return await this.yamlStorage.save(article);
  }

  async getBySlug(slug) {
    await this._initPostgres();
    if (this.usePostgres) {
      try {
        return await this.pgStorage.getBySlug(slug);
      } catch (error) {
        console.warn('PostgreSQL query failed, falling back to YAML:', error.message);
        this.usePostgres = false;
      }
    }
    return await this.yamlStorage.getBySlug(slug);
  }

  async getById(id) {
    await this._initPostgres();
    if (this.usePostgres) {
      try {
        return await this.pgStorage.getById(id);
      } catch (error) {
        console.warn('PostgreSQL query failed, falling back to YAML:', error.message);
        this.usePostgres = false;
      }
    }
    return await this.yamlStorage.getById(id);
  }

  async list(options = {}) {
    await this._initPostgres();
    if (this.usePostgres) {
      try {
        return await this.pgStorage.list(options);
      } catch (error) {
        console.warn('PostgreSQL query failed, falling back to YAML:', error.message);
        this.usePostgres = false;
      }
    }
    return await this.yamlStorage.list(options);
  }

  async update(slug, updates) {
    await this._initPostgres();
    if (this.usePostgres) {
      try {
        return await this.pgStorage.update(slug, updates);
      } catch (error) {
        console.warn('PostgreSQL update failed, falling back to YAML:', error.message);
        this.usePostgres = false;
      }
    }
    return await this.yamlStorage.update(slug, updates);
  }

  async delete(slug) {
    await this._initPostgres();
    if (this.usePostgres) {
      try {
        return await this.pgStorage.delete(slug);
      } catch (error) {
        console.warn('PostgreSQL delete failed, falling back to YAML:', error.message);
        this.usePostgres = false;
      }
    }
    return await this.yamlStorage.delete(slug);
  }

  async close() {
    if (this.pgStorage) {
      await this.pgStorage.close();
    }
  }
}

/**
 * Factory function to create appropriate storage adapter
 * @param {Object} config - Storage configuration
 * @returns {StorageAdapter} Configured storage adapter
 */
export function createStorage(config = {}) {
  const storageType = config.type || process.env.STORAGE_TYPE || 'hybrid';
  const yamlBaseDir = config.baseDir || process.env.STORAGE_BASE_DIR || path.join(process.cwd(), '../web/public/articles');

  const pgConfig = {
    host: config.host || process.env.DB_HOST || 'localhost',
    port: config.port || process.env.DB_PORT || 5432,
    database: config.database || process.env.DB_NAME || 'rollingcodes',
    user: config.user || process.env.DB_USER || 'postgres',
    password: config.password || process.env.DB_PASSWORD,
    ssl: config.ssl || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };

  switch (storageType) {
    case 'postgresql':
    case 'postgres':
      return new PostgreSQLStorage(pgConfig);

    case 'yaml':
    case 'file':
      return new YAMLFileStorage(yamlBaseDir);

    case 'hybrid':
    default:
      return new HybridStorage(pgConfig, yamlBaseDir);
  }
}
