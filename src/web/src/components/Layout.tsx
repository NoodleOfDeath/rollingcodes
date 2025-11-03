import React from 'react';

import {
  mdiAccountCircle,
  mdiCodeJson,
  mdiEmail,
  mdiFileDocument,
  mdiGithub,
  mdiHome,
  mdiMenu,
  mdiNewspaper,
  mdiRss,
  mdiStackOverflow,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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

const NAV_LINKS = [
  {
    href: '/',
    icon: mdiHome,
    label: 'Home',
  },
  {
    href: '/tech-news',
    icon: mdiRss,
    label: 'Tech News',
  },
  {
    icon: mdiAccountCircle,
    label: 'About',
    subItems: [
      {
        href: '/about',
        icon: mdiAccountCircle,
        label: 'About Me',
      },
      {
        href: '/resume',
        icon: mdiFileDocument,
        label: 'Resume',
      },
      {
        href: '/read',
        icon: mdiNewspaper,
        label: 'My Articles',
      },
    ],
  },
  {
    href: '/contact',
    icon: mdiEmail,
    label: 'Contact',
  },
];

const Layout = ({
  children,
  ...props
}: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [aboutMenuAnchor, setAboutMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAboutMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAboutMenuAnchor(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAboutMenuAnchor(null);
  };

  const drawerContent = (
    <Box
      sx={ { width: 250 } }
      role="presentation">
      <Box sx={ { p: 2 } }>
        <Typography
          variant="h6"
          sx={ {
            color: 'primary.main',
            fontWeight: 700,
          } }>
          Rolling Codes
        </Typography>
      </Box>
      <Divider />
      <List>
        {NAV_LINKS.map((link) => {
          if (link.subItems) {
            return (
              <Accordion
                key={ link.label }
                disableGutters
                elevation={ 0 }
                sx={ {
                  '&:before': { display: 'none' },
                  bgcolor: 'transparent',
                } }>
                <AccordionSummary
                  expandIcon={ <ExpandMore /> }
                  sx={ { px: 2 } }>
                  <Box sx={ {
                    alignItems: 'center', display: 'flex', gap: 2,
                  } }>
                    <Icon path={ link.icon } size={ 1 } color={ theme.palette.text.primary } />
                    <Typography>{link.label}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={ { p: 0 } }>
                  <List>
                    {link.subItems.map((subItem) => (
                      <ListItem key={ subItem.label } disablePadding>
                        <ListItemButton
                          component={ Link }
                          href={ subItem.href }
                          onClick={ toggleDrawer(false) }
                          sx={ { pl: 4 } }>
                          <ListItemIcon>
                            <Icon path={ subItem.icon } size={ 1 } color={ theme.palette.text.primary } />
                          </ListItemIcon>
                          <ListItemText primary={ subItem.label } />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          }
          return (
            <ListItem key={ link.label } disablePadding>
              <ListItemButton
                component={ Link }
                href={ link.href! }
                onClick={ toggleDrawer(false) }>
                <ListItemIcon>
                  <Icon path={ link.icon } size={ 1 } color={ theme.palette.text.primary } />
                </ListItemIcon>
                <ListItemText primary={ link.label } />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

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
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={ toggleDrawer(true) }
                sx={ { color: 'text.primary', mr: 1 } }>
                <Icon path={ mdiMenu } size={ 1 } />
              </IconButton>
            )}
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
            {!isMobile && (
              <React.Fragment>
                {NAV_LINKS.map((link) => {
                  if (link.subItems) {
                    return (
                      <React.Fragment key={ link.label }>
                        <Button
                          onMouseEnter={ handleAboutMenuOpen }
                          startIcon={ <Icon path={ link.icon } size={ 0.8 } /> }
                          endIcon={ <ExpandMore /> }
                          sx={ { color: 'text.primary' } }>
                          {link.label}
                        </Button>
                        <Menu
                          anchorEl={ aboutMenuAnchor }
                          open={ Boolean(aboutMenuAnchor) }
                          onClose={ handleAboutMenuClose }
                          MenuListProps={ { onMouseLeave: handleAboutMenuClose } }
                          sx={ { '& .MuiMenu-paper': { mt: 1 } } }>
                          {link.subItems.map((subItem) => (
                            <MenuItem
                              key={ subItem.label }
                              component={ Link }
                              href={ subItem.href }
                              onClick={ handleAboutMenuClose }>
                              <ListItemIcon>
                                <Icon path={ subItem.icon } size={ 0.8 } />
                              </ListItemIcon>
                              <ListItemText>{subItem.label}</ListItemText>
                            </MenuItem>
                          ))}
                        </Menu>
                      </React.Fragment>
                    );
                  }
                  return (
                    <Button
                      key={ link.label }
                      component={ Link }
                      href={ link.href! }
                      startIcon={ <Icon path={ link.icon } size={ 0.8 } /> }
                      sx={ { color: 'text.primary' } }>
                      {link.label}
                    </Button>
                  );
                })}
                <Divider orientation="vertical" flexItem sx={ { mx: 1 } } />
                <Button
                  component="a"
                  href="https://github.com/noodleofdeath/rollingcodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={ <Icon path={ mdiCodeJson } size={ 0.8 } /> }
                  variant="outlined"
                  sx={ {
                    '&:hover': { borderColor: 'primary.main' },
                    borderColor: 'rgba(0, 217, 255, 0.3)',
                    color: 'primary.main',
                  } }>
                  View Source Code
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={ drawerOpen }
        onClose={ toggleDrawer(false) }>
        {drawerContent}
      </Drawer>

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
