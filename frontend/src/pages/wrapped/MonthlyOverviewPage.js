import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css'
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import BarChart from '../../components/Data/BarChart';
import Pagination from '../../components/Pagination/Pagination'
import { getMonthlyOverview } from '../../api/getMonthlyOverview';

const months = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September',
  'October', 
  'November', 
  'December'
];
const labelMonths = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

function MonthlyOverviewPage() {
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

    fetchMonthlyData();
  }, []);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='monthly-overview-page'>
      <Logo noWordmark={true} />
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={1} children={
          <p>We all had our <span className='maximum'>highs</span> and <span className='minimum'>lows</span> throught the year...</p>
        } />
        <div>
          <FadeInAndOut delay={2} waitBetween={3} children={
            <p>The month you spent more was <span className='maximum'>{maxMonth}</span>.</p>
          } />
          <br />
          <FadeInAndOut delay={3.5} waitBetween={1.5} children={
            <p>The month you spent less was <span className='minimum'>{minMonth}</span>.</p>
          } />
        </div>
        <FadeIn delay={6} expand={true} children={
          <BarChart xLabel={labelMonths} delay={6} data={monthlyData} />
        } />
      </div>
      <Pagination
        index={2}
        total={3}
        prev='/wrapped/categories'
        next='/wrapped/daily-average-overview'
      />
    </div>
  );
}

export default MonthlyOverviewPage;