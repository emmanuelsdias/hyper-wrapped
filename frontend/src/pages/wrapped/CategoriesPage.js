import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Logo from '../../components/Logo/Logo'
import Pagination from '../../components/Pagination/Pagination'

function CategoriesPage() {
  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='categories-page'>
      <Logo noWordmark={true} />
      <Pagination 
        index={1}
        total={3}
        prev=''
        next='/wrapped/monthly-overview'
        />
    </div>
  );
}

export default CategoriesPage;