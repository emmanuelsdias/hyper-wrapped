import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css';
import Logo from '../../components/Logo/Logo';
import FadeIn from '../../components/Animations/FadeIn';
import FadeInAndOut from '../../components/Animations/FadeInAndOut';
import Reveal from '../../components/Animations/Reveal';
import Slide from '../../components/Animations/Slide';
import Pagination from '../../components/Pagination/Pagination';
import { getBiggestSpending } from '../../api/getBiggestSpending';
import { useWindowDimensions } from '../../utils/window';
import { getDays, getMonthsNames, nth } from '../../utils/date';
import { numberWithCommas } from '../../utils/number';


function BiggestSpendingPage() {
  const { height, width } = useWindowDimensions();

  const days = getDays();
  const months = getMonthsNames();

  const currentYear = useSelector((state) => state.currentYear);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = useSelector((state) => state.userId);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBiggestSpendingData = async () => {
      try {
        const data = await getBiggestSpending(userId, currentYear);
        setDay(data.day);
        setMonth(data.month);
        setAmount(data.amount);
        setDescription(data.general_description);
      } catch (error) {
        console.error('Error fetching biggest spending data:', error);
      }
    };
    if (isLogged) {
      fetchBiggestSpendingData();
    }
  }, []);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className='wrapped-page' id='biggest-spending-page'>
      <Slide delay={6.5} length={Math.min(width / 2, 500) - 40} direction='left' duration={1}>
        <Logo noWordmark={true} />
      </Slide>
      <Reveal delay={7} length={20} direction={'right'}>
        <span className='title'>Biggest Spending</span>
      </Reveal>
      <FadeIn delay={6}>
        <div className='background-symbol'>$</div>
      </FadeIn>
      <div className='wrapped-container'>
        <FadeInAndOut waitBetween={3}>
          <p>Be it a <span className='maximum'>planned trip</span> or an <span className='minimum'>emergency</span>, there is always a day where we need to go big...</p>
        </FadeInAndOut>
        <FadeInAndOut delay={4} waitBetween={2}>
          <p>Here is your <span className='attention'>highest transaction</span> from this year.</p>
        </FadeInAndOut>
        <Reveal delay={7} length={50} direction={'right'}>
          <div id='biggest-transaction'>
            <p className='b-t-date'>{`${months[month]} ${days[day]}${nth(day)}`}</p>
            <p className='b-t-amount'>{`U\$ ${numberWithCommas(amount)}`}</p>
            <p className='b-t-description'>{`spent on ${description}`}</p>
          </div>
        </Reveal>
      </div>
      <FadeIn delay={7} duration={1} min_opacity={0.2}>
        <Pagination
          index={1}
          total={5}
          prev=''
          next='/wrapped/most-frequent-categories'
        />
      </FadeIn>
    </div>
  );
}

export default BiggestSpendingPage;