import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#0a0e27' },
        h1: { color: '#00d9ff' },
        h2: { color: '#33e1ff' },
        h3: { color: '#e0e0e0' },
        h4: { color: '#e0e0e0' },
        h5: { color: '#e0e0e0' },
        h6: { color: '#e0e0e0' },
      },
    },
  },
  palette: {
    background: {
      default: '#0a0e27',
      paper: '#141b3d',
    },
    mode: 'dark',
    primary: {
      dark: '#00a8cc',
      light: '#33e1ff',
      main: '#00d9ff',
    },
    secondary: {
      dark: '#9965f4',
      light: '#c89eff',
      main: '#bb86fc',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    body1: { lineHeight: 1.7 },
    fontFamily: [
      'OpenSans',
      '-apple-system',
      '"system-ui"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      color: '#00d9ff',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      color: '#33e1ff',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      color: '#e0e0e0',
      fontWeight: 600,
    },
    h4: {
      color: '#e0e0e0',
      fontWeight: 500,
    },
    h5: {
      color: '#e0e0e0',
      fontWeight: 500,
    },
    h6: {
      color: '#e0e0e0',
      fontWeight: 500,
    },
  },
});

export { theme };