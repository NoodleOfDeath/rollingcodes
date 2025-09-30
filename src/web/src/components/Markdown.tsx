/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Typography, styled } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import { Link } from './common';

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main };
` as any;

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={ {
        a: ({ children, href }) => href ? <Link href={ href }>{children}</Link> : <React.Fragment>children</React.Fragment>,
        h1: ({ children }) => <StyledTypography variant="h1" gutterBottom>{children}</StyledTypography>,
        h2: ({ children }) => <StyledTypography variant="h2" gutterBottom>{children}</StyledTypography>,
        h3: ({ children }) => <StyledTypography variant="h3" gutterBottom>{children}</StyledTypography>,
        h4: ({ children }) => <StyledTypography variant="h4" gutterBottom>{children}</StyledTypography>,
        h5: ({ children }) => <StyledTypography variant="h5" gutterBottom>{children}</StyledTypography>,
        h6: ({ children }) => <StyledTypography variant="h6" gutterBottom>{children}</StyledTypography>,
        li: ({ children }) => <StyledTypography component="li">{children}</StyledTypography>,
        p: ({ children }) => <StyledTypography paragraph>{children}</StyledTypography>,
      } }>
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };