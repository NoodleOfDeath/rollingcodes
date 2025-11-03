import React from 'react';

import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import type { Article } from '~/components';
import { ArticleCard, NewsCard } from '~/components';
import { getAllArticles } from '~/utils/articles';
import type { RSSNewsItem } from '~/utils/rss';
import { getAINews } from '~/utils/rss';

type HomeProps = {
  articles: Article[];
  newsItems: RSSNewsItem[];
};

const ITEMS_PER_PAGE = 6;

const Home = ({ articles, newsItems }: HomeProps) => {
  const [newsPage, setNewsPage] = React.useState(1);
  const newsSectionRef = React.useRef<HTMLDivElement>(null);

  const displayedArticles = articles.slice(0, 2);
  const totalNewsPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const displayedNews = newsItems.slice(
    (newsPage - 1) * ITEMS_PER_PAGE,
    newsPage * ITEMS_PER_PAGE
  );

  const handleNewsPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setNewsPage(value);
    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Rolling Codes - AI Insights & Technical Articles</title>
        <meta
          name="description"
          content="Technical articles and AI news by Thom Morgan. Stay updated on breakthroughs in artificial intelligence and software engineering." />
      </Head>

      <Box
        sx={ {
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 8,
        } }>
        <Container maxWidth="lg">
          {/* Articles Section */}
          <Box sx={ { mb: 8 } }>
            <Box
              sx={ {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                mb: 4,
              } }>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={ {
                    color: 'primary.main',
                    fontWeight: 700,
                  } }>
                  Latest Articles
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Technical insights and thoughts on software engineering
                </Typography>
              </Box>
              <Button
                component={ Link }
                href="/read"
                endIcon={ <ArrowForward /> }
                sx={ {
                  '&:hover': { bgcolor: 'rgba(0, 217, 255, 0.1)' },
                  color: 'primary.main',
                } }>
                View All
              </Button>
            </Box>

            <Grid container spacing={ 3 }>
              {displayedArticles.map((article) => (
                <Grid item xs={ 12 } key={ article.slug }>
                  <ArticleCard article={ article } />
                </Grid>
              ))}
            </Grid>

            {displayedArticles.length === 0 && (
              <Box sx={ { py: 8, textAlign: 'center' } }>
                <Typography variant="h6" color="text.secondary">
                  No articles yet. Check back soon!
                </Typography>
              </Box>
            )}
          </Box>

          {/* AI News Section */}
          <Box ref={ newsSectionRef } sx={ { mb: 8 } }>
            <Box sx={ { mb: 4 } }>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={ {
                  color: 'primary.main',
                  fontWeight: 700,
                } }>
                AI Breakthroughs & News
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Latest developments in artificial intelligence from around the web
              </Typography>
            </Box>

            <Grid container spacing={ 3 }>
              {displayedNews.map((news, index) => (
                <Grid item xs={ 12 } md={ 6 } key={ `${news.link}-${index}` }>
                  <NewsCard news={ news } />
                </Grid>
              ))}
            </Grid>

            {displayedNews.length === 0 && (
              <Box sx={ { py: 8, textAlign: 'center' } }>
                <Typography variant="h6" color="text.secondary">
                  No news items available at the moment.
                </Typography>
              </Box>
            )}

            {totalNewsPages > 1 && (
              <Box
                sx={ {
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 4,
                } }>
                <Pagination
                  count={ totalNewsPages }
                  page={ newsPage }
                  onChange={ handleNewsPageChange }
                  color="primary"
                  size="large" />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = getAllArticles();
  const newsItems = await getAINews(30);

  return {
    props: {
      articles: articles.map((article) => ({
        ...article,
        date: article.date.toISOString(),
      })) as any,
      newsItems: newsItems.map((item) => ({
        ...item,
        pubDate: item.pubDate.toISOString(),
      })) as any,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default Home;
