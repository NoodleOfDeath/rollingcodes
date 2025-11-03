import React from 'react';

import { Box, Button, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>404 - Page Not Found | Rolling Codes</title>
        <meta name="description" content="Page not found" />
      </Head>
      <Box
        sx={ {
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 8,
        } }>
        <Container maxWidth="md">
          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              textAlign: 'center',
            } }>
            {/* Silly Robot ASCII Art */}
            <Box
              component="pre"
              sx={ {
                color: 'primary.main',
                fontFamily: 'monospace',
                fontSize: { md: '0.8rem', xs: '0.5rem' },
                lineHeight: 1.2,
                m: 0,
              } }>
              {`
    ┌─────────────┐
    │  ERROR 404  │
    └─────────────┘
         ▄▀▀▀▀▀▀▀▀▀▀▄
        █  ⚆   ⚆  █
        █     ▼     █
        █  \\_____/  █
         ▀▄▄▄▄▄▄▄▄▄▀
           ║║  ║║
          ╔╩╩══╩╩╗
          ║      ║
          ╚══════╝
              `}
            </Box>

            <Typography
              variant="h1"
              sx={ {
                color: 'primary.main',
                fontSize: { md: '6rem', xs: '3rem' },
                fontWeight: 700,
              } }>
              404
            </Typography>

            <Typography
              variant="h4"
              sx={ {
                color: 'text.primary',
                fontWeight: 600,
                mb: 2,
              } }>
              Oops! This page went rogue.
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={ { maxWidth: '600px', mb: 2 } }>
              Even Boston Dynamics robots have better pathfinding than this URL.
              Looks like we need to retrain our navigation model.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
              The page you're looking for doesn't exist, may have been moved, or is currently being debugged.
            </Typography>

            <Box sx={ { display: 'flex', gap: 2 } }>
              <Button
                variant="contained"
                size="large"
                onClick={ () => router.push('/') }
                sx={ {
                  px: 4,
                  py: 1.5,
                } }>
                Go Home
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={ () => router.back() }
                sx={ {
                  px: 4,
                  py: 1.5,
                } }>
                Go Back
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={ { fontStyle: 'italic', mt: 4 } }>
              "It's not a bug, it's an undocumented feature." - Every developer ever
            </Typography>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Custom404;
