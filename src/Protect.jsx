import { Navigate } from 'react-router-dom';

const Protect = ({ when, children, ...props }) => {
  return when ? <Navigate {...props} /> : children;
};

export default Protect;
