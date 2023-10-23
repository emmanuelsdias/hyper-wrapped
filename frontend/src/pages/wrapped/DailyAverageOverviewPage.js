import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css'
import Logo from '../../components/Logo/Logo'
import FadeIn from '../../components/Animations/FadeIn'
import FadeInAndOut from '../../components/Animations/FadeInAndOut'
import SwipeUp from '../../components/Animations/SwipeUp'
import BarChart from '../../components/Data/BarChart';
import Pagination from '../../components/Pagination/Pagination'
import { getDailyAverageOverview } from '../../api/getDailyAverageOverview';

var days = [];
for (var i = 1; i <= 31; i++) {
  days.push(i);
}
var labelDays = [];
for (var i = 1; i <= 31; i++) {
  if (i % 5 == 0) 
    labelDays.push(i);
  else
    labelDays.push('');
}

function nth (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function DailyAverageOverviewPage() {
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
      <Logo noWordmark={true} />
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={1} children={
          <p>Now, let's see your expenses throught the month...</p>
        } />
        <div>
          <SwipeUp delay={3} duration={0.5} children={
            <FadeInAndOut delay={2} waitBetween={3} children={
              <p>On average, you spent more on the <span className='maximum'>{maxDay}{nth(maxDay)}</span>.</p>
            } />
          } />
          <br />
          <FadeInAndOut delay={3.5} waitBetween={1.5} children={
            <p>Meanwhile, you spent less on the <span className='minimum'>{minDay}{nth(minDay)}</span>.</p>
          } />
        </div>
        <FadeIn delay={6} expand={true} children={
          <BarChart delay={6} xLabel={labelDays} gap={0} gradual={true} rotate={true} data={dailyData} />
        } />
      </div>
      <Pagination
        index={3}
        total={3}
        prev='/wrapped/monthly-overview'
        next=''
      />
    </div>
  );
}

export default DailyAverageOverviewPage;