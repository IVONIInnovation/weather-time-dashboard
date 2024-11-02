import React from 'react';

export const Card = ({ className, children }) => {
  return (
    <div className={`rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card;
