import { createTheme } from '@mui/material';

const theme = createTheme({
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