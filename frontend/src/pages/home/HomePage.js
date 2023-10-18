import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css'
import Logo from '../../components/Logo/Logo'
import FadeIn from '../../components/Animations/FadeIn'
import Reveal from '../../components/Animations/Reveal'

function HomePage() {
  const isLogged = useSelector((state) => state.isLogged);
  const name = useSelector((state) => state.firstName);

  if (!isLogged) {
    return (
      <div id='home-page'>
        <Logo />
        <div className='text-container'>
          <p>this is</p>
          <p className='attention'>hyper wrapped:</p>
          <p>your year in review!</p>
        </div>
        <Link className='button-container' to="/login">
          <button>
            enter my account
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div id='home-page'>
        <Logo />
        <div className='text-container'>
          <Reveal delay={0} children={
            <p>hello {name}, this is</p>
          } />
          <Reveal delay={0.5} children={
            <p className='attention'>hyper wrapped:</p>
          } />
          <Reveal delay={1.0} children={
            <p>your year in review!</p>
          } />
        </div>
        <Link className='button-container' to="/wrapped">
          <FadeIn delay={1.5} duration={1} children={
            <button>
              check my year
            </button>
          } />
        </Link>
      </div>
    );
  }
}

export default HomePage;