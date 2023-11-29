import './index.css';

function TotalsPopupBoxElement({
  id,
  invoice_date,
  company_name,
  invoice_number,
  invoice_amount,
  currency,
  onChange,
  checked,
}) {
  const handleCheckboxChange = () => {
    onChange(id); // Pass the id to setCheckedHandler
  };

  return (
    <div className='TotalsPopupBoxElement' key={id}>
      <input
        type='checkbox'
        value={id}
        name={'paid_id'}
        checked={checked}
        onChange={handleCheckboxChange}
      ></input>
      <span className='Totals__list-item__name'>{company_name}</span>
      <span> {invoice_date.slice(0, 10)}</span>
      <span> {invoice_number}</span>
      <span> {invoice_amount}</span>
      <span>{currency.toUpperCase()}</span>
    </div>
  );
}

export default TotalsPopupBoxElement;
