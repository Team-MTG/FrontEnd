const Spinner = () => {
  return (
    <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="origin-center animate-spinner">
        <path
          className="translate-x-2 translate-y-2 transform rotate-[-40deg]"
          d="M26.88 1.24496C26.05 3.08496 23.38 9.36495 22.28 11.955C24.56 12.355 26.8 12.965 28.97 13.785C30.97 12.635 34.79 10.485 35.62 10.505C37.04 10.535 37.24 10.9049 36.44 11.9649C35.64 13.0249 33.15 16.5749 33.15 16.5749C33.15 16.5749 34.37 20.695 34.8 21.945C35.23 23.195 34.92 23.485 33.56 23.085C32.77 22.855 29.82 19.665 28.29 17.975C25.97 18.105 23.65 18.015 21.34 17.705C21.56 20.505 22.08 27.2749 22.28 29.2649C22.45 31.0149 21.22 30.165 21.22 30.165C20.43 29.645 19.74 28.9849 19.18 28.2149C16.96 24.2249 13.66 17.885 12.88 16.395C12.14 16.285 11.34 16.1549 10.45 16.0149C0.59001 14.5049 1.28988e-05 12.155 0.110013 11.485C0.220013 10.815 1.54001 8.76496 11.4 10.275L13.83 10.645C15.05 9.45495 20.23 4.42495 23.62 1.29495C24.39 0.734947 25.26 0.314957 26.18 0.0549571C26.18 0.0549571 27.63 -0.385045 26.9 1.22496L26.88 1.24496Z"
          fill="white"
        />
        <path
          d="M49.5 97.0849C75.7335 97.0849 97 75.8185 97 49.5849C97 23.3514 75.7335 2.08496 49.5 2.08496C23.2665 2.08496 2 23.3514 2 49.5849C2 75.8185 23.2665 97.0849 49.5 97.0849Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M49.5 25.405C36.15 25.405 25.32 36.225 25.32 49.585C25.32 62.935 36.14 73.765 49.5 73.765C62.86 73.765 73.68 62.945 73.68 49.585C73.68 36.235 62.86 25.405 49.5 25.405ZM51.87 62.515V66.815H48.04V62.715C44.98 62.695 42.06 61.465 39.92 59.285L43.21 55.955C44.91 57.525 47.18 58.325 49.49 58.175C52.48 58.175 54.09 57.025 54.09 54.915C54.14 54.095 53.85 53.295 53.29 52.695C52.65 52.145 51.84 51.815 50.99 51.775L47.85 51.335C45.98 51.165 44.21 50.405 42.81 49.155C41.51 47.755 40.84 45.885 40.95 43.975C40.95 39.845 43.6 36.805 48.05 36.125V32.375H51.88V36.075C54.34 36.255 56.66 37.305 58.42 39.045L55.21 42.265C53.75 40.955 51.83 40.305 49.88 40.455C47.18 40.455 45.86 41.975 45.86 43.785C45.84 44.495 46.12 45.175 46.63 45.675C47.31 46.255 48.15 46.615 49.04 46.715L52.11 47.155C53.94 47.285 55.68 47.995 57.08 49.185C58.5 50.685 59.23 52.715 59.09 54.775C59.09 59.085 56.09 61.785 51.9 62.535L51.87 62.515Z"
        fill="white"
      />
    </svg>
  );
};

const Loading = ({ msg }) => {
  return (
    <div className="bg-[#63C9EF] h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <Spinner />
      <p className="font-tn mt-8">{msg}</p>
    </div>
  );
};

export default Loading;
