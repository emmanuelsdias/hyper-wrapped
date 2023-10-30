import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import Reveal from '../../components/Animations/Reveal';
import Slide from '../../components/Animations/Slide';
import Pagination from '../../components/Pagination/Pagination';
import { getMostExpensiveCategories } from '../../api/getMostExpensiveCategories';
import { useWindowDimensions } from '../../utils/window';


function MostExpensiveCategoriesPage() {
  const { height, width } = useWindowDimensions();
  
  const currentYear = useSelector((state) => state.currentYear);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = useSelector((state) => state.userId);

  const [topCategories, setTopCategories] = useState([]);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchMostExpensiveCategories = async () => {
      try {
        const data = await getMostExpensiveCategories(userId, currentYear);
        setTopCategories(data.top_categories);
      } catch (error) {
        console.error('Error fetching most expensive categories data:', error);
      }
    };
    fetchMostExpensiveCategories();
  }, []);

  return (
    <div className='wrapped-page' id='most-expensive-categories-page'>
      <Slide delay={6.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1} children={
        <Logo noWordmark={true} />
      } /> 
      <Reveal delay={7} length={20} direction={'right'} children={
        <span className='title'>Most Expensive Categories</span>
      } />
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={3} children={
          <p>This year, <span className='attention'>you knew</span> where to place your money.</p>
        } />
        <FadeInAndOut delay={4} waitBetween={2} children={
          <p>Here is where you <span className='maximum'>spent</span> the <span className='minimum'>most money</span> on.</p>
        } />
        <div>
          {topCategories.map((category, index) => (
            <Reveal delay={7} length={100} key={index} direction={'right'} children={
              <CategoryCard key={index} category={category} position={index + 1} type='most-expensive' />
            } />
          ))}
        </div>
      </div>
      <FadeIn delay={7} duration={1} min_opacity={0.2} children={
        <Pagination 
          index={5}
          total={5}
          prev='/wrapped/daily-average-overview'
          next='/home'
          />
        } />
    </div>
  );
}

export default MostExpensiveCategoriesPage;