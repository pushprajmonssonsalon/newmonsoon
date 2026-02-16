// AnimatedNumber.jsx - Component
import React from 'react';
import { useCounDown } from '../../utils/hooks/useCountDown';

export const AnimatedNumber = ({ value, suffix = '', duration = 2000, className = '' }) => {
  // Extract number from string (e.g., "212+" -> 212)
  const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''));
  const { count, countRef } = useCounDown(numericValue, duration);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <span ref={countRef} className={className}>
      {formatNumber(count)}{suffix}
    </span>
  );
};
