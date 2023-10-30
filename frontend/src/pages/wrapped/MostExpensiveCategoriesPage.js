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


function MostExpensiveCategoriesPage() {
  const { height, width } = useWindowDimensions();
  
  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='most-expensive-categories-page'>
      <Slide delay={2.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1} children={
        <Logo noWordmark={true} />
      } /> 
      <Reveal delay={3} length={20} direction={'right'} children={
        <span className='title'>Most Spent Categories</span>
      } />
      <FadeIn delay={3} duration={1} min_opacity={0.2} children={
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

export default MostExpensiveCategoriesPage;