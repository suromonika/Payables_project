import './index.css';
import Chart from '../Chart';
import { useSelector } from 'react-redux';

function ExpensesChart({ amounts, filteredByYear }) {
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const expense of amounts) {
    amounts.map((item) => {
      const invoiceMonth = new Date(expense.invoice_date).getUTCMonth();
      chartDataPoints[invoiceMonth].value += expense.invoice_amount_eur;
    });
  }
  console.log('EXPENSES CHART', chartDataPoints);
  return <Chart dataPoints={chartDataPoints}></Chart>;
}

export default ExpensesChart;
