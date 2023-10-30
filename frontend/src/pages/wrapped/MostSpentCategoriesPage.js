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
      <FadeIn delay={0} duration={1} min_opacity={0.2} children={
        <Pagination 
          index={5}
          total={5}
          prev='/wrapped/most-frequent-categories'
          next=''
          />
        } />
    </div>
  );
}

export default MostSpentCategoriesPage;