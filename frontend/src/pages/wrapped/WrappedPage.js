import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function WrappedPage() {
  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to='/' />;
  }
  return <Navigate to='/wrapped/categories' />
}

export default WrappedPage;