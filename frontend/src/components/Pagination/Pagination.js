import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

import './style.css'

function Pagination({ index, total, prev = '', next = '' }) {
  return (
    <div className="pagination">
      <div className="prev-page">
        {prev === ''
          ? <FaChevronUp />
          : <Link to={prev}>
            <FaChevronUp />
          </Link>
        }
      </div>
      <div className="page-no">
        <span>{index} / {total}</span>
      </div>
      <div className="next-page">
        {next === ''
          ? <FaChevronDown />
          : <Link to={next}>
            <FaChevronDown />
          </Link>
        }
      </div>
    </div>
  );
};

export default Pagination;