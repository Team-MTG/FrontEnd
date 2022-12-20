import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ msg }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      <Typography sx={{ marginTop: '30px' }}>{msg}</Typography>
    </Box>
  );
};

export default Loading;
