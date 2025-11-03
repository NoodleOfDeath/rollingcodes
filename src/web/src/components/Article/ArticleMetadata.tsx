import React from 'react';

import { mdiCalendar, mdiClockOutline } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

import { AuthorTooltip } from './AuthorTooltip';

import type { AuthorSocials } from '~/utils/authors';

type ArticleMetadataProps = {
  author: string;
  authorBio?: string;
  authorSocials?: AuthorSocials;
  date: Date | string;
  readtime: string;
};

export const ArticleMetadata: React.FC<ArticleMetadataProps> = ({
  author,
  authorBio,
  authorSocials,
  date,
  readtime,
}) => {
  return (
    <Box
      sx={ {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      } }>
      <Box sx={ {
        alignItems: 'center', display: 'flex', gap: 0.5,
      } }>
        <Icon path={ mdiCalendar } size={ 0.7 } color="#a0a0a0" />
        <Typography variant="body2" color="text.secondary">
          {format(new Date(date), 'MMMM d, yyyy')}
        </Typography>
      </Box>
      <Box sx={ {
        alignItems: 'center', display: 'flex', gap: 0.5,
      } }>
        <Icon path={ mdiClockOutline } size={ 0.7 } color="#a0a0a0" />
        <Typography variant="body2" color="text.secondary">
          {readtime}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" component="span">
        by
        {' '}
        <AuthorTooltip
          author={ author }
          bio={ authorBio }
          socials={ authorSocials } />
      </Typography>
    </Box>
  );
};
