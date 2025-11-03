import React from 'react';

import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = {
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <Box
      sx={ {
        '& a': {
          '&:hover': {
            borderColor: 'primary.light',
            color: 'primary.light',
          },
          borderBottom: '1px solid',
          borderColor: 'primary.main',
          color: 'primary.main',
          textDecoration: 'none',
          transition: 'all 0.2s',
        },
        '& blockquote': {
          '& p': { mb: 0 },
          bgcolor: 'rgba(0, 217, 255, 0.05)',
          borderColor: 'primary.main',
          borderLeft: '4px solid',
          fontStyle: 'italic',
          my: 3,
          pl: 3,
          py: 1,
        },
        '& code': {
          bgcolor: 'rgba(0, 217, 255, 0.1)',
          borderRadius: 1,
          color: 'primary.light',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          px: 1,
          py: 0.5,
        },
        '& h1': {
          fontSize: { md: '2.5rem', xs: '2rem' },
          mb: 2,
          mt: 4,
        },
        '& h2': {
          fontSize: { md: '2rem', xs: '1.5rem' },
          mb: 2,
          mt: 3,
        },
        '& h3': {
          fontSize: { md: '1.5rem', xs: '1.25rem' },
          mb: 2,
          mt: 3,
        },
        '& h4': {
          fontSize: { md: '1.25rem', xs: '1.1rem' },
          mb: 2,
          mt: 2,
        },
        '& h5': {
          fontSize: { md: '1.1rem', xs: '1rem' },
          mb: 2,
          mt: 2,
        },
        '& h6': {
          fontSize: { md: '1rem', xs: '0.9rem' },
          mb: 2,
          mt: 2,
        },
        '& li': {
          color: 'text.primary',
          lineHeight: 1.8,
          mb: 1,
        },
        '& p': {
          color: 'text.primary',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          mb: 2,
        },
        '& pre': {
          '& code': {
            bgcolor: 'transparent',
            p: 0,
          },
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: 2,
          overflow: 'auto',
          p: 2,
        },
        '& strong': {
          color: 'primary.light',
          fontWeight: 600,
        },
        '& ul, & ol': {
          mb: 2,
          pl: 3,
        },
      } }>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Box>
  );
};

export { Markdown };