const NotFound = ({ msg }) => {
  return (
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <span className="text-8xl text-rose-500">404</span>
      <span className="mt-4 text-lg">{msg}</span>
    </div>
  );
};

export default NotFound;
