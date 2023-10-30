import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css';
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import Reveal from '../../components/Animations/Reveal';
import Slide from '../../components/Animations/Slide';
import HorizontalBarChart from '../../components/Data/HorizontalBarChart';
import Pagination from '../../components/Pagination/Pagination';
import { getDailyAverageOverview } from '../../api/getDailyAverageOverview';
import { useWindowDimensions } from '../../utils/window';
import { getDays, getEveryOtherDay, nth } from '../../utils/date';


function DailyAverageOverviewPage() {
  const { height, width } = useWindowDimensions();

  const days = getDays();
  const labelDays = getEveryOtherDay(5);

  const currentYear = useSelector((state) => state.currentYear);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = useSelector((state) => state.userId);

  const [dailyData, setDailyData] = useState([]);
  const [maxDay, setMaxDay] = useState('');
  const [minDay, setMinDay] = useState('');

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const data = await getDailyAverageOverview(userId, currentYear);
        const dataDict = data.daily_summary;
        const dataArray = Object.values(dataDict);

        const maxIndex = dataArray.indexOf(Math.max(...dataArray));
        setMaxDay(days[maxIndex]);

        const minIndex = dataArray.indexOf(Math.min(...dataArray));
        setMinDay(days[minIndex]);

        setDailyData(dataArray);
      } catch (error) {
        console.error('Error fetching daily data:', error);
      }
    };
    fetchDailyData();
  }, []);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='daily-average-overview-page'>
      <Slide delay={7.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1} children={
        <Logo noWordmark={true} />
      } />
      <Reveal delay={8} length={20} direction={'right'} children={
        <span className='title'>Daily Average Spendings</span>
      } />
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={2} children={
          <p>Now, let's see your <span className='attention'>expenses</span> throughout the <span className='attention'>month</span>...</p>
        } />
        <div>
          <Slide delay={4.5} length={50} duration={0.5} children={
            <FadeInAndOut delay={3} waitBetween={4} children={
              <p>On average, you spent the most on the <span className='maximum'>{maxDay}{nth(maxDay)}</span>.</p>
            } />
          } />
          <br />
          <FadeInAndOut delay={5} waitBetween={2} children={
            <p>Meanwhile, you spent the least on the <span className='minimum'>{minDay}{nth(minDay)}</span>.</p>
          } />
        </div>
        <FadeIn delay={8} expand={true} children={
          <HorizontalBarChart delay={8} xLabel={labelDays} height={height - 150} gradual={true} data={dailyData} />
        } />
      </div>
      <FadeIn delay={8} duration={1} min_opacity={0.2} children={
        <Pagination
          index={4}
          total={5}
          prev='/wrapped/monthly-overview'
          next='/wrapped/most-expensive-categories'
        />
      } />
    </div>
  );
}

export default DailyAverageOverviewPage;