import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#25080a',
          color: '#000',
        },
      },
    },
    MuiTextField: {
      defaultProps: { sx: { input: { color: '#000' } } },
      styleOverrides: {
        root: {
          background: '#000',
          color: '#25080a',
        },
      },
    },
  },
  palette: {
    primary: {
      contrastText: '#080a25',
      main: '#000',
    },
    secondary: {
      contrastText: '#000',
      main: '#25080a',
    },
    text: { primary: '#fff', secondary: '#000' },
  },
  typography: {
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
  },
});

export { theme };