import './index.css';
import ChartBar from '../ChartBar';

function Chart({ dataPoints }) {
  const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);
  console.log('DataPointValues', dataPointValues);
  return (
    <div className='Chart'>
      {' '}
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.index}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        ></ChartBar>
      ))}
    </div>
  );
}

export default Chart;
