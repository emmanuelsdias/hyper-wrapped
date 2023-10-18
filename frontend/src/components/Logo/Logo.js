import React from 'react';

import logoSymbol from '../../images/double_symbol.svg';
import logoWordmark from '../../images/wordmark.svg';

import './style.css'

function Logo({ noWordmark = false }) {
  return (
    <div className='logo'>
      <img className='logo-symbol' src={logoSymbol} alt='symbol' />
      {!noWordmark && <img className='logo-wordmark' src={logoWordmark} alt='hyperplane' />}
    </div>
  );
};

export default Logo;