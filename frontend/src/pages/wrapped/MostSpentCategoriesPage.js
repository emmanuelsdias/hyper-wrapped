import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css'
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import Reveal from '../../components/Animations/Reveal';
import Slide from '../../components/Animations/Slide';
import HorizontalBarChart from '../../components/Data/HorizontalBarChart';
import Pagination from '../../components/Pagination/Pagination';
import { getDailyAverageOverview } from '../../api/getDailyAverageOverview';
import { useWindowDimensions } from '../../utils/window';


function MostSpentCategoriesPage() {
  const { height, width } = useWindowDimensions();
  
  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='most-spent-categories-page'>
      <Logo noWordmark={true} />
      <Pagination 
        index={6}
        total={6}
        prev='/wrapped/most-frequent-categories'
        next=''
        />
    </div>
  );
}

export default MostSpentCategoriesPage;