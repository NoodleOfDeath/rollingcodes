import React from 'react';

import { mdiTag } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Box, Chip } from '@mui/material';

type ArticleTagsProps = {
  tags: string;
};

export const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  if (!tags) {
    return null;
  }

  return (
    <Box sx={ {
      display: 'flex', flexWrap: 'wrap', gap: 1,
    } }>
      {tags.split(',').map((tag, index) => (
        <Chip
          key={ index }
          icon={ <Icon path={ mdiTag } size={ 0.6 } /> }
          label={ tag.trim() }
          size="small"
          sx={ {
            '&:hover': { bgcolor: 'rgba(0, 217, 255, 0.2)' },
            bgcolor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            color: 'primary.main',
          } } />
      ))}
    </Box>
  );
};
