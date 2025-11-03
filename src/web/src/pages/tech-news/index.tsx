import React from 'react';

import { Code, GitHub } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { GetStaticProps } from 'next';

import { NewsCard } from '~/components/News/NewsCard';
import { getAINews, RSSNewsItem } from '~/utils/rss';

type TechNewsPageProps = {
  news: RSSNewsItem[];
};

const GITHUB_BASE_URL = 'https://github.com/noodleofdeath/rollingcodes/blob/main/src/web/src';

const SourceCodeSection = () => {
  return (
    <Card
      sx={ {
        bgcolor: 'rgba(0, 217, 255, 0.05)',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        borderRadius: 2,
        mb: 6,
      } }>
      <CardContent sx={ { p: 4 } }>
        <Box sx={ { alignItems: 'center', display: 'flex', gap: 2, mb: 3 } }>
          <Code sx={ { color: 'primary.main', fontSize: 32 } } />
          <Typography variant="h5" sx={ { color: 'primary.main', fontWeight: 600 } }>
            Curious how this is done?
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" paragraph>
          This Tech News page aggregates RSS feeds from leading technology publications. Want to
          see how it works? Check out the source code. For those who dig deeper, there might be
          other interesting discoveries throughout the site.
        </Typography>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Button
              variant="outlined"
              startIcon={ <GitHub /> }
              fullWidth
              href={ `${GITHUB_BASE_URL}/pages/tech-news/index.tsx` }
              target="_blank"
              rel="noopener noreferrer"
              sx={ {
                '&:hover': { borderColor: 'primary.main' },
                borderColor: 'rgba(0, 217, 255, 0.3)',
                justifyContent: 'flex-start',
              } }>
              Tech News Page
            </Button>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Button
              variant="outlined"
              startIcon={ <GitHub /> }
              fullWidth
              href={ `${GITHUB_BASE_URL}/utils/rss.ts` }
              target="_blank"
              rel="noopener noreferrer"
              sx={ {
                '&:hover': { borderColor: 'primary.main' },
                borderColor: 'rgba(0, 217, 255, 0.3)',
                justifyContent: 'flex-start',
              } }>
              RSS Feed Utility
            </Button>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Button
              variant="outlined"
              startIcon={ <GitHub /> }
              fullWidth
              href={ `${GITHUB_BASE_URL}/components/News/NewsCard.tsx` }
              target="_blank"
              rel="noopener noreferrer"
              sx={ {
                '&:hover': { borderColor: 'primary.main' },
                borderColor: 'rgba(0, 217, 255, 0.3)',
                justifyContent: 'flex-start',
              } }>
              News Card Component
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const TechNewsPage: React.FC<TechNewsPageProps> = ({ news }) => {
  return (
    <Container maxWidth="lg" sx={ { py: 8 } }>
        <Box sx={ { mb: 6, textAlign: 'center' } }>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={ {
              color: 'primary.main',
              fontWeight: 700,
            } }>
            Tech News
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={ { maxWidth: 800, mx: 'auto' } }>
            Latest news from leading technology and AI publications
          </Typography>
        </Box>

        <SourceCodeSection />

        <Grid container spacing={ 4 }>
          {news.map((item, index) => (
            <Grid item xs={ 12 } key={ `${item.link}-${index}` }>
              <NewsCard news={ item } />
            </Grid>
          ))}
        </Grid>

        {news.length === 0 && (
          <Box sx={ { py: 8, textAlign: 'center' } }>
            <Typography variant="h6" color="text.secondary">
              No news articles available at the moment.
            </Typography>
          </Box>
        )}
      </Container>
  );
};

export const getStaticProps: GetStaticProps<TechNewsPageProps> = async () => {
  const news = await getAINews(20);

  return {
    props: {
      news: news.map((item) => ({
        ...item,
        pubDate: item.pubDate.toISOString() as any,
      })),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default TechNewsPage;
