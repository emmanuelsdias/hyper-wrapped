import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css';
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import Reveal from '../../components/Animations/Reveal';
import Slide from '../../components/Animations/Slide';
import BarChart from '../../components/Data/BarChart';
import Pagination from '../../components/Pagination/Pagination';
import { getMonthlyOverview } from '../../api/getMonthlyOverview';
import { useWindowDimensions } from '../../utils/window';
import { getMonthsNames, getMonthsInitials } from '../../utils/date';


function MonthlyOverviewPage() {
  const { height, width } = useWindowDimensions();

  const months = getMonthsNames();
  const monthsInitials = getMonthsInitials();

  const currentYear = useSelector((state) => state.currentYear);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = useSelector((state) => state.userId);

  const [monthlyData, setMonthlyData] = useState([]);
  const [maxMonth, setMaxMonth] = useState('');
  const [minMonth, setMinMonth] = useState('');

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const data = await getMonthlyOverview(userId, currentYear);
        const dataDict = data.monthly_summary;
        const dataArray = Object.values(dataDict);

        const maxIndex = dataArray.indexOf(Math.max(...dataArray));
        setMaxMonth(months[maxIndex]);

        const minIndex = dataArray.indexOf(Math.min(...dataArray));
        setMinMonth(months[minIndex]);

        setMonthlyData(dataArray);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };
    if (isLogged) {
      fetchMonthlyData();
    }
  }, []);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='monthly-overview-page'>
      <Slide delay={7.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1}>
        <Logo noWordmark={true} />
      </Slide>
      <Reveal delay={8} length={20} direction={'right'}>
        <span className='title'>Monthly Spendings</span>
      </Reveal>
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={2}>
          <p>We all had our <span className='maximum'>highs</span> and <span className='minimum'>lows</span> throught the year...</p>
        </FadeInAndOut>
        <div>
          <FadeInAndOut delay={3} waitBetween={4}>
            <p>The month you spent the most was <span className='maximum'>{maxMonth}</span>.</p>
          </FadeInAndOut>
          <br />
          <FadeInAndOut delay={5} waitBetween={2}>
            <p>The month you spent the least was <span className='minimum'>{minMonth}</span>.</p>
          </FadeInAndOut>
        </div>
        <FadeIn delay={8} expand={true}>
          <BarChart xLabel={monthsInitials} delay={8} height={Math.min(height - 150, 300)} data={monthlyData} />
        </FadeIn>
      </div>
      <FadeIn delay={8} duration={1} min_opacity={0.2}>
        <Pagination
          index={3}
          total={5}
          prev='/wrapped/most-frequent-categories'
          next='/wrapped/daily-average-overview'
        />
      </FadeIn>
    </div>
  );
}

export default MonthlyOverviewPage;