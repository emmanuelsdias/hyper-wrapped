import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Logo from '../../components/Logo/Logo'
import Pagination from '../../components/Pagination/Pagination'

function MonthlyOverviewPage() {
  const isLogged = useSelector((state) => state.isLogged);

  // if (!isLogged) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div id='monthly-overview-page'>
      <Logo noWordmark={true} />
      <Pagination 
        index={2}
        total={2}
        prev='/wrapped/categories'
        next=''
        />
    </div>
  );
}

export default MonthlyOverviewPage;