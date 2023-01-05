import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          // height: '100vh',
          // maxWidth: '480px',
          // maxHeight: '590px',
          // display: 'flex',
          // justifyContent: 'center',
          // margin: '0 auto',/
        },
      },
    },
  },
});

export default theme;
