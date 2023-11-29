import './index.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button';
import TotalsPopupBoxElement from '../TotalsPopupBoxElement';
import { setChecked, toggleChecked, updateData } from '../../../store/store';

function Totals() {
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data);

  const toPayList = useSelector((state) => {
    return data.filter((item) => item.to_pay && item.status === 'Unpaid');
  });

  const checked = useSelector((state) => state.checked);

  const totalAmount = toPayList.reduce(
    (total, item) => total + item.invoice_amount,
    0
  );

  const payablesListHandler = () => {
    setShowList((showList) => !showList);
    console.log(showList);
  };

  const setCheckedHandler = (id) => {
    const updatedChecked = { ...checked }; // Creating a copy of the checked state
    updatedChecked[id] = {
      ...updatedChecked[id], // Copying the existing state for this ID
      checked: !updatedChecked[id]?.checked || true, // Toggling the checked value
    };
    dispatch(setChecked(updatedChecked));
  };

  const markAsPaidHandler = async () => {
    const checkedIds = Object.keys(checked);
    try {
      const updateDataObject = { status: 'Paid', to_pay: false };

      const updateRequests = checkedIds.map(async (item) => {
        dispatch(updateData({ _id: item, status: 'Paid', to_pay: false }));
        const response = await fetch(`/api/invoices/${item}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateDataObject),
        });

        if (response.ok) {
          return item;
        } else {
          console.log(`Error occurred while updating status for ID ${item}`);
          return null;
        }
      });

      const updatedIds = await Promise.all(updateRequests);

      console.log('IDs successfully updated:', updatedIds.filter(Boolean));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='Totals_container'>
      <div className='Totals' onClick={payablesListHandler}>
        <span>Total: {totalAmount + ' EUR'}</span>
      </div>
      {showList ? (
        <div className='Totals__popup-box'>
          {toPayList.length < 0 ? (
            ''
          ) : (
            <Button name={'paid'} onClick={markAsPaidHandler}>
              Mark as paid
            </Button>
          )}
          <div className='Totals__popup-box__list-items'>
            {toPayList.map((item, index) =>
              item.status === 'Unpaid' ? (
                <TotalsPopupBoxElement
                  key={item._id}
                  onChange={() => setCheckedHandler(item._id)}
                  id={item._id}
                  invoice_number={item.invoice_number}
                  invoice_date={item.invoice_date}
                  invoice_amount={item.invoice_amount}
                  company_name={item.name}
                  currency={item.currency}
                  checked={checked[index]}
                ></TotalsPopupBoxElement>
              ) : (
                'Nothing to pay'
              )
            )}{' '}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Totals;
