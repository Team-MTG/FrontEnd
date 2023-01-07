import { CircularProgress } from '@mui/material';

const Loading = ({ msg }) => {
  return (
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <CircularProgress />
      <p className="mt-8">{msg}</p>
    </div>
  );
};

export default Loading;
