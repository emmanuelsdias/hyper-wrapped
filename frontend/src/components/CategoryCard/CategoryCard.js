import React from 'react';

import './style.css'

function CategoryCard({ category, position }) {
  return (
    <div className={`category-card pos${position}`}>
      <div className='position'>{position}</div>
      <div>
        <div className='description'>{category.full_description}</div>
        <div className='count'>{category.num_occurrences} transactions</div>
      </div>
    </div>
  );
};

export default CategoryCard;