import React from 'react';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import type { Article } from './Article.types';
import { ArticleMetadata } from './ArticleMetadata';
import { ArticleTags } from './ArticleTags';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
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
      <CardActionArea component={ Link } href={ `/read/${article.slug}` }>
        <CardContent sx={ { p: 4 } }>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={ {
              color: 'primary.main',
              fontWeight: 600,
              mb: 2,
            } }>
            {article.title}
          </Typography>

          <Box sx={ { mb: 2 } }>
            <ArticleMetadata
              author={ article.author }
              authorBio={ article.authorData?.bio }
              authorSocials={ article.authorData?.socials }
              date={ article.date }
              readtime={ article.readtime } />
          </Box>

          <Box sx={ { mb: 2 } }>
            <ArticleTags tags={ article.tags } />
          </Box>

          <Typography variant="body1" color="text.secondary" sx={ { lineHeight: 1.7 } }>
            {article.content.substring(0, 250)}
            {article.content.length > 250 ? '...' : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
