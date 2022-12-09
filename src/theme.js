import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
        },
      },
    },
  },
});

export default theme;
