import './index.css';
import { useState, useEffect } from 'react';

function ChartBar({ maxValue, value, label }) {
  const [barFillHeight, setBarFillHeight] = useState('100%');

  useEffect(() => {
    if (maxValue > 0) {
      setBarFillHeight(Math.round((value / maxValue) * 100) + '%');
    }
  }, [maxValue, value]);

  console.log(barFillHeight);
  return (
    <div className='ChartBar'>
      <div className='ChartBar__inner'>
        <div
          className='ChartBar__inner__fill'
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className='ChartBar__label'>{label}</div>
    </div>
  );
}

export default ChartBar;
