import React from 'react';

import {
  mdiEmail,
  mdiFileDocument,
  mdiMenu,
  mdiShieldAccount,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { 
  AppBar,
  Button,
  Divider,
  Drawer,
  Typography,
} from '@mui/material';
import { default as Link } from 'next/link';
import { useRouter } from 'next/router';

type LayoutProps = React.PropsWithChildren & {
  //
};

type MenuItem = {
  href: string;
  icon: string;
  text: string;
  target?: string;
  disabled?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  {
    href: '/terms',
    icon: mdiFileDocument,
    text: 'Terms & Conditions',
  },
  {
    href: '/privacy',
    icon: mdiShieldAccount,
    text: 'Privacy Policy',
  },
  {
    href: '/contact',
    icon: mdiEmail,
    text: 'Help',
  },
];

const FOOTER_LINKS = [
  {
    href: '/privacy',
    label: 'Privacy Policy',
  },
  {
    href: '/terms',
    label: 'Terms & Conditions',
  },
];

const Logo = () => {
  return (
    <Link 
      style={ { 
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: '1.5rem',
        gap: '0.5rem',
        height: 10,
      } }
      href='/'>
      Rolling Codes
    </Link>
  );
};

const Layout = ({ 
  children,
  ...props
}: LayoutProps) => {
  
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Dismiss navigation when route changes
  React.useEffect(() => {
    const handleRouteChange = () => {
      setDrawerOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <div
      style={ {
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      } }
      { ...props }>
      {/* header */}
      <AppBar color='secondary' position='sticky'>
        <div
          style={ {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1000px',
            padding: '1rem 0.5rem',
            width: 'calc(100% - 2rem)',
          } }>
          <Logo />
          <div style={ { flexGrow: 1 } } />
          <Button
            color='inherit'
            onClick={ () => setDrawerOpen(true) }>
            <Icon path={ mdiMenu } size={ 1 } />
          </Button>
        </div>
      </AppBar>
      {/* content */}
      <div
        style={ {
          flexDirection: 'column',
          flexGrow: 1,
          maxWidth: '1000px',
          overflow: 'hidden',
          padding: '1rem',
          width: 'calc(100% - 2rem)',
        } }>
        {children}
      </div>
      {/* footer */}
      <div 
        style={ {
          alignItems: 'center',
          color: '#000000',
          flexDirection: 'column',
          padding: '1rem',
        } }>
        <div style={ {
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.5rem',
        } }>
          <div style={ {
            flexDirection: 'row',
            gap: '0.5rem',
          } }>
            {FOOTER_LINKS.map((link, i) => (
              <React.Fragment key={ link.label }>
                <Link href={ link.href }>
                  {link.label}
                </Link>
                {i + 1 < FOOTER_LINKS.length && (
                  <Divider 
                    flexItem
                    orientation='vertical' />
                )}
              </React.Fragment>
            ))}
          </div>
          <Divider flexItem />
          <Typography>
            Copyright &copy; 2024 Read Less LLC
          </Typography>
        </div>
      </div>
      {/* navigation */}
      <Drawer
        anchor='top'
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }>
        <div 
          style={ {
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '1000px',
            padding: '1rem 0.5rem',
          } }>
          <div style={ { flexDirection: 'column' } }>
            <div style={ {
              flexDirection: 'column',
              gap: '0.5rem',
            } }>
              <div>
                <Logo />
              </div>
              {MENU_ITEMS.map((item) => (
                <div 
                  key={ item.text } 
                  style={ { color: '#000000' } }>
                  <Link href={ item.href } target={ item.target }>
                    <div>
                      <div 
                        style={ {
                          alignItems: 'center',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        } }>
                        <Icon 
                          path={ item.icon } 
                          size={ 1 } />
                        { item.text }
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div style={ { flexGrow: 1 } } />
            <div>
              <Typography variant='caption'>
                &copy; 2025 Morgan Enterprise LLC
              </Typography>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export { Layout };