import { useRef } from 'react';
import { createPortal } from 'react-dom';

const ToastBar = ({ msg, duration }) => {
  return <div className="bg-[#63C9EF]">{msg}</div>;
};

export const Toast = ({ msg }) => {
  const toastRoot = useRef(document.getElementById('toast'));

  return createPortal(<ToastBar msg={msg} />, toastRoot.current);
};
