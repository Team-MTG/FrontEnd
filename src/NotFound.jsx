const NotFound = ({ msg }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-8xl text-rose-500">404</span>
      <span className="mt-4 text-lg">{msg}</span>
    </div>
  );
};

export default NotFound;
