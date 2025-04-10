import React, { useState } from 'react';
import './starRating.css';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className='star-rating d-flex align-items-center gap-1'>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`star ${starValue <= (hover || rating) ? 'yellow' : ''}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <i className='ri-star-s-fill'></i>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
