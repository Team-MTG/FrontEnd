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
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <ErrorOutlineIcon color="error" sx={{ fontSize: '100px' }} />
      <span>{msg}</span>
    </div>
  );
};

export default Error;
