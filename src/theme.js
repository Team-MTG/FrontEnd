import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          height: '100%',
        },
        '#root': {
          height: '100%',
          maxHeight: '590px',
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  },
});

export default theme;
