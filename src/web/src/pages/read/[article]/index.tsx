import React from 'react';

import { mdiArrowLeft } from '@mdi/js';
import { Icon } from '@mdi/react';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import type { Article } from '~/components';
import {
  ArticleMetadata,
  ArticleTags,
  Markdown,
} from '~/components';
import { getAllArticles, getArticleBySlug } from '~/utils/articles';

type ArticlePageProps = {
  article: Article;
};

const ArticlePage = ({ article }: ArticlePageProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>{`${article.title} - Rolling Codes`}</title>
        <meta name="description" content={ article.content.substring(0, 160) } />
        <meta property="og:title" content={ article.title } />
        <meta property="og:description" content={ article.content.substring(0, 160) } />
      </Head>
      <Box
        sx={ {
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 4,
        } }>
        <Container maxWidth="md">
          <Button
            component={ Link }
            href="/read"
            startIcon={ <Icon path={ mdiArrowLeft } size={ 0.8 } /> }
            sx={ {
              '&:hover': { bgcolor: 'rgba(0, 217, 255, 0.1)' },
              color: 'primary.main',
              mb: 4,
            } }>
            Back to Articles
          </Button>

          <Paper
            elevation={ 0 }
            sx={ {
              bgcolor: 'background.paper',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              borderRadius: 2,
              p: { md: 6, xs: 3 },
            } }>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={ {
                color: 'primary.main',
                fontWeight: 700,
                mb: 3,
              } }>
              {article.title}
            </Typography>

            <Box sx={ { mb: 3 } }>
              <ArticleMetadata
                author={ article.author }
                authorBio={ article.authorData?.bio }
                authorSocials={ article.authorData?.socials }
                date={ article.date }
                readtime={ article.readtime } />
            </Box>

            <Box sx={ { mb: 4 } }>
              <ArticleTags tags={ article.tags } />
            </Box>

            <Divider sx={ { borderColor: 'rgba(0, 217, 255, 0.1)', mb: 4 } } />

            <Markdown>{article.content}</Markdown>

            <Divider sx={ { borderColor: 'rgba(0, 217, 255, 0.1)', my: 4 } } />

            <Box
              sx={ {
                bgcolor: 'rgba(255, 152, 0, 0.05)',
                border: '1px solid rgba(255, 152, 0, 0.2)',
                borderRadius: 1,
                mb: 3,
                p: 2,
              } }>
              <Typography variant="body2" color="text.secondary">
                Want to discuss this article? Standard contact info is available throughout the site.
                Or, if you&apos;ve been paying attention, you might know a more direct route.
              </Typography>
            </Box>

            <Button
              component={ Link }
              href="/read"
              startIcon={ <Icon path={ mdiArrowLeft } size={ 0.8 } /> }
              sx={ {
                '&:hover': { bgcolor: 'rgba(0, 217, 255, 0.1)' },
                color: 'primary.main',
              } }>
              Back to Articles
            </Button>
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  const paths = articles.map((article) => ({ params: { article: article.slug } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const article = getArticleBySlug(params?.article as string);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article: {
        ...article,
        date: article.date.toISOString(),
      } as any,
    },
  };
};

export default ArticlePage;
