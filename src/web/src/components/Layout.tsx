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
import { useRouter } from 'next/router';

import { Link, View } from '~/components';

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
      row
      itemsCenter
      href='/'
      gap={ '0.5rem' }
      fontSize={ '1.5rem' }
      height="10">
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
    <View col itemsCenter minHeight={ '100vh' } { ...props }>
      {/* header */}
      <AppBar color='secondary' position='sticky'>
        <View
          row
          itemsCenter
          justifyBetween
          maxWidth='1000px'
          marginX={ 'auto' }
          width='calc(100% - 2rem)'
          px='1rem'
          py='0.5rem'>
          <Logo />
          <View flexGrow={ 1 } />
          <Button
            color='inherit'
            onClick={ () => setDrawerOpen(true) }>
            <Icon path={ mdiMenu } size={ 1 } />
          </Button>
        </View>
      </AppBar>
      {/* content */}
      <View
        col
        padding='1rem'
        maxWidth='1000px'
        width='calc(100% - 2rem)'
        minHeight={ 400 }
        flexGrow={ 1 }
        overflow='hidden'>
        {children}
      </View>
      {/* footer */}
      <View 
        col
        itemsCenter
        padding='1rem'
        color='#000'>
        <View col itemsCenter gap='0.5rem'>
          <View row gap='0.5rem'>
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
          </View>
          <Divider flexItem />
          <Typography>
            Copyright &copy; 2024 Read Less LLC
          </Typography>
        </View>
      </View>
      {/* navigation */}
      <Drawer
        anchor='top'
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }>
        <View 
          col
          maxWidth='1000px'
          width='calc(100% - 2rem)'
          px='1rem'
          py='0.5rem'>
          <View col>
            <View col gap='0.5rem'>
              <View>
                <Logo />
              </View>
              {MENU_ITEMS.map((item) => (
                <View 
                  key={ item.text } 
                  color='#000'>
                  <Link href={ item.href } target={ item.target }>
                    <View disabled={ item.disabled }>
                      <View 
                        row
                        itemsCenter
                        gap='0.5rem'>
                        <Icon 
                          path={ item.icon } 
                          size={ 1 } />
                        { item.text }
                      </View>
                    </View>
                  </Link>
                </View>
              ))}
            </View>
            <View flexGrow={ 1 } />
            <View>
              <Typography variant='caption'>
                &copy; 2024 Read Less LLC
              </Typography>
            </View>
          </View>
        </View>
      </Drawer>
    </View>
  );
};

export { Layout };