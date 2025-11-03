import React from 'react';

import { CalendarToday, Language } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

import type { RSSNewsItem } from '~/utils/rss';

type NewsCardProps = {
  news: RSSNewsItem;
};

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card
      sx={ {
        '&:hover': {
          border: '1px solid rgba(0, 217, 255, 0.3)',
          boxShadow: '0 8px 24px rgba(0, 217, 255, 0.15)',
          transform: 'translateY(-4px)',
        },
        bgcolor: 'background.paper',
        border: '1px solid rgba(0, 217, 255, 0.1)',
        borderRadius: 2,
        transition: 'all 0.3s ease',
      } }>
      <CardActionArea href={ news.link } target="_blank" rel="noopener noreferrer">
        <CardContent sx={ { p: 4 } }>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={ {
              color: 'primary.main',
              fontWeight: 600,
              mb: 2,
            } }>
            {news.title}
          </Typography>

          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2,
            } }>
            <Box
              sx={ {
                alignItems: 'center',
                display: 'flex',
                gap: 0.5,
              } }>
              <CalendarToday sx={ { color: 'text.secondary', fontSize: 16 } } />
              <Typography variant="body2" color="text.secondary">
                {formatDate(news.pubDate)}
              </Typography>
            </Box>
            <Box
              sx={ {
                alignItems: 'center',
                display: 'flex',
                gap: 0.5,
              } }>
              <Language sx={ { color: 'text.secondary', fontSize: 16 } } />
              <Typography variant="body2" color="text.secondary">
                {news.source}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={ { lineHeight: 1.7 } }>
            {news.content.substring(0, 200)}
            {news.content.length > 200 ? '...' : ''}
          </Typography>

          <Box sx={ { mt: 2 } }>
            <Chip
              icon={ <Language /> }
              label="External Link"
              size="small"
              sx={ {
                '&:hover': { bgcolor: 'rgba(0, 217, 255, 0.2)' },
                bgcolor: 'rgba(0, 217, 255, 0.1)',
                color: 'primary.main',
              } } />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
