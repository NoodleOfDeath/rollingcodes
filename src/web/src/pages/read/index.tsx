import React from 'react';

import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import type { GetStaticProps } from 'next';
import Head from 'next/head';

import type { Article } from '~/components';
import { About, ArticleCard } from '~/components';
import { getAllArticles } from '~/utils/articles';

type ReadIndexProps = {
  articles: Article[];
};

const ARTICLES_PER_PAGE = 10;

const ReadIndex = ({ articles }: ReadIndexProps) => {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const displayedArticles = articles.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Articles - Rolling Codes</title>
        <meta name="description" content="Technical articles and insights by Thom Morgan" />
      </Head>
      <Box
        sx={ {
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 8,
        } }>
        <Container maxWidth="lg">
          <Box sx={ { mb: 6 } }>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={ {
                color: 'primary.main',
                fontWeight: 700,
                mb: 2,
              } }>
              Articles
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Technical insights, analysis, and thoughts on software engineering and AI
            </Typography>
          </Box>

          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 } md={ 8 }>
              <Grid container spacing={ 3 }>
                {displayedArticles.map((article) => (
                  <Grid item xs={ 12 } key={ article.slug }>
                    <ArticleCard article={ article } />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={ 12 } md={ 4 }>
              <About />
            </Grid>
          </Grid>

          {articles.length === 0 && (
            <Box sx={ { py: 8, textAlign: 'center' } }>
              <Typography variant="h5" color="text.secondary">
                No articles yet. Check back soon!
              </Typography>
            </Box>
          )}

          {totalPages > 1 && (
            <Box
              sx={ {
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
              } }>
              <Pagination
                count={ totalPages }
                page={ page }
                onChange={ handlePageChange }
                color="primary"
                size="large" />
            </Box>
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps<ReadIndexProps> = async () => {
  const articles = getAllArticles();
  return {
    props: {
      articles: articles.map((article) => ({
        ...article,
        date: article.date.toISOString(),
      })) as any,
    },
  };
};

export default ReadIndex;
