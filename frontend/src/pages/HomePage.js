import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from "../components/Logo.js";

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
          <p>hello {name}, this is</p>
          <p className='attention'>hyper wrapped:</p>
          <p>your year in review!</p>
        </div>
        <Link className='button-container' to="/wrapped">
          <button>
            check my year
          </button>
        </Link>
      </div>
    );
  }
}

export default HomePage;