import React from 'react';

import './style.css'
import { numberWithCommas } from '../../utils/number';

function CategoryCard({ category, position, type }) {
  if (type === 'most-frequent') {
    return (
      <div className={`category-card pos${position} most-frequent`}>
        <div className='position'>{position}</div>
        <div>
          <div className='description'>{category.full_description}</div>
          <div className='count'>{category.num_occurrences} transactions</div>
        </div>
      </div>
    );
  }
  else if (type === 'most-expensive') {
    return (
      <div className={`category-card pos${position} most-expensive`}>
        <div className='position'>{position}</div>
        <div>
          <div className='amount'>U$ {numberWithCommas(category.total_amount)}</div>
          <div className='description'>spent on {category.full_description}</div>
        </div>
      </div>
    );
  }
};

export default CategoryCard;