import { createTheme } from '@mui/material/styles';

const colors = {
  black: "#000000",
  red: "#EF3C3C",
  blue: "#5A75E5",
  lightBlue: "#63C9EF",
}

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
  colors: colors
});

export default theme;
