import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Logo from "../components/Logo.js";

function WrappedPage() {
  const isLogged = useSelector((state) => state.isLogged);
  
  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div id='wrapped-page'>
      <Logo noWordmark={true} />
    </div>
  );
}

export default WrappedPage;