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
import { getMostFrequentCategories } from '../../api/getMostFrequentCategories';
import { useWindowDimensions } from '../../utils/window';


function MostFrequentCategoriesPage() {
  const { height, width } = useWindowDimensions();

  const currentYear = useSelector((state) => state.currentYear);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = useSelector((state) => state.userId);

  const [topCategories, setTopCategories] = useState([]);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchMostFrequentCategories = async () => {
      try {
        const data = await getMostFrequentCategories(userId, currentYear);
        setTopCategories(data.top_categories);
      } catch (error) {
        console.error('Error fetching most frequent categories data:', error);
      }
    };
    fetchMostFrequentCategories();
  }, []);

  return (
    <div className='wrapped-page' id='most-frequent-categories-page'>
      <Slide delay={6.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1} children={
        <Logo noWordmark={true} />
      } />
      <Reveal delay={7} length={20} direction={'right'} children={
        <span className='title'>Most Frequent Categories</span>
      } />
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={3} children={
          <p><span className='pos1'>1</span>, <span className='pos2'>2</span>, <span className='pos3'>3</span>... There were some purchases you couldn't stop making!</p>
        } />
        <FadeInAndOut delay={4} waitBetween={2} children={
          <p>Here are your <span className='attention'>top recurring</span> categories.</p>
        } />
        <div>
          {topCategories.map((category, index) => (
            <Reveal delay={7 + (0.8 - index*0.2)} length={50} key={index} direction={'down'} children={
              <CategoryCard key={index} category={category} position={index + 1} type='most-frequent' />
            } />
          ))}
        </div>
      </div>
      <FadeIn delay={7} duration={1} min_opacity={0.2} children={
        <Pagination
          index={2}
          total={5}
          prev='/wrapped/biggest-spending'
          next='/wrapped/monthly-overview'
        />
      } />
    </div>
  );
}

export default MostFrequentCategoriesPage;