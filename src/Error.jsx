import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = ({ msg, cleanUp }) => {
  const navigate = useNavigate();
  let timeoutID = useRef(null);

  useEffect(() => {
    timeoutID.current = setTimeout(() => {
      navigate('/', {
        replace: true,
      });
    }, 2000);

    return () => clearTimeout(timeoutID.current);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: '100px' }} />
      <Typography>{msg}</Typography>
    </Box>
  );
};

export default Error;
