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


function BiggestSpendingPage() {
  const { height, width } = useWindowDimensions();

  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='biggest-spending-page'>
      <Slide delay={7.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1} children={
        <Logo noWordmark={true} />
      } /> 
      <Reveal delay={8} length={20} direction={'right'} children={
        <span className='title'>Biggest Spending</span>
      } />
      {/* Sometimes it's best to forget everything and spend like there is no tomorrow */}
      <Pagination 
        index={1}
        total={6}
        prev=''
        next='/wrapped/monthly-overview'
        />
    </div>
  );
}

export default BiggestSpendingPage;