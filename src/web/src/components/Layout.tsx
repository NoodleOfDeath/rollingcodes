import React from 'react';

import {
  mdiGithub,
  mdiHome,
  mdiNewspaper,
  mdiStackOverflow,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

type LayoutProps = React.PropsWithChildren & {
  //
};

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/noodleofdeath',
    icon: mdiGithub,
    label: 'GitHub',
  },
  {
    href: 'https://stackoverflow.com/users/409958/rollingcodes',
    icon: mdiStackOverflow,
    label: 'Stack Overflow',
  },
];

const Layout = ({
  children,
  ...props
}: LayoutProps) => {
  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      } }
      { ...props }>
      <AppBar position="sticky" sx={ { bgcolor: 'background.paper' } }>
        <Container maxWidth="lg">
          <Toolbar sx={ { gap: 2 } }>
            <Typography
              variant="h6"
              component={ Link }
              href="/"
              sx={ {
                color: 'primary.main',
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: 'none',
              } }>
              Rolling Codes
            </Typography>
            <Button
              component={ Link }
              href="/"
              startIcon={ <Icon path={ mdiHome } size={ 0.8 } /> }
              sx={ { color: 'text.primary' } }>
              Home
            </Button>
            <Button
              component={ Link }
              href="/read"
              startIcon={ <Icon path={ mdiNewspaper } size={ 0.8 } /> }
              sx={ { color: 'text.primary' } }>
              Articles
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={ { flexGrow: 1 } }>
        {children}
      </Box>

      <Box
        component="footer"
        sx={ {
          bgcolor: 'background.paper',
          borderTop: '1px solid rgba(0, 217, 255, 0.2)',
          mt: 'auto',
          py: 4,
        } }>
        <Container maxWidth="lg">
          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 3,
              justifyContent: 'space-between',
            } }>
            <Box sx={ { textAlign: { md: 'left', xs: 'center' } } }>
              <Typography variant="body2" color="text.secondary">
                &copy; 2025 Read Less LLC. All rights reserved.
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={ { display: { md: 'block', xs: 'none' } } } />

            <Box sx={ { display: 'flex', gap: 2 } }>
              {SOCIAL_LINKS.map((link) => (
                <IconButton
                  key={ link.label }
                  component="a"
                  href={ link.href }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ link.label }
                  sx={ {
                    '&:hover': {
                      bgcolor: 'rgba(0, 217, 255, 0.1)',
                      color: 'primary.main',
                    },
                    color: 'text.secondary',
                  } }>
                  <Icon path={ link.icon } size={ 1 } />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export { Layout };