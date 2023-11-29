import { fetchCurrencyData } from '../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  delete_invoice,
  toggle_to_pay,
  fetchData,
  updateData,
  toggle_reminder,
} from '../../../store/store';

import './index.css';
import CustomButton from '../CustomButton';

const StyledOutputCard = styled.div`
  ${({ selected }) => {
    return selected
      ? css`
          border: 1px solid #51d2f6;
          background-color: #ecfafe !important;
          color: #0ba9d5;
        `
      : '';
  }}
`;

function OutputCard({
  name,
  invoice_date,
  invoice_number,
  invoice_amount,
  service_date,
  currency,
  id,
  comment,
  onClickEdit,
}) {
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(delete_invoice(id));
        console.log('Data succesfuly deleted');
      } else {
        console.log('Error occurred while deleting data');
      }
    } catch (error) {
      console.log('Error occurred while deleting data', error);
    }
  };

  const currentToPay = useSelector((state) => {
    const itemId = id;
    return state.toPay[itemId];
  });

  const currentReminder = useSelector((state) => {
    const itemId = id;
    return state.reminder[itemId];
  });

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [currentToPay, currentReminder, dispatch]);

  const selectHandler = async (e) => {
    try {
      if (currentToPay === undefined || currentToPay === null) {
        await dispatch(fetchData());
      }
      const updatedToPay = !currentToPay;
      dispatch(toggle_to_pay({ itemId: id, toPay: updatedToPay }));
      dispatch(updateData({ _id: id, to_pay: updatedToPay }));

      const response = await fetch(`/api/invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to_pay: updatedToPay }),
      });

      if (response.ok) {
        console.log('toPay value successfully updated', data);
      } else {
        console.log('Error occurred while updating toPay value');
      }
    } catch (error) {
      console.log('Error occurred while updating data', error);
    }
  };

  const reminderHandler = async (e) => {
    e.stopPropagation();
    try {
      if (currentReminder === undefined || currentReminder === null) {
        await dispatch(fetchData());
      }
      const updatedReminder = !currentReminder;
      dispatch(toggle_reminder({ itemId: id, reminder: updatedReminder }));
      dispatch(updateData({ _id: id, reminder: updatedReminder }));

      const response = await fetch(`/api/invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reminder: updatedReminder }),
      });

      if (response.ok) {
        console.log('Reminder value successfully updated', data);
      } else {
        console.log('Error occurred while updating reminder value');
      }
    } catch (error) {
      console.log('Error occurred while updating data', error);
    }
  };

  const editHandler = () => {
    onClickEdit(data);
  };

  const currencyData = useSelector((state) => state.currencyData.data.eur);

  ///Remove this line after objects without currency removed
  if (currency === undefined) {
    return currency === 'eur';
  }

  const exchangeRate = currencyData
    ? currencyData[currency.toLowerCase()]
    : null;
  return (
    <StyledOutputCard
      role='button'
      className='OutputCard'
      id={id}
      selected={currentToPay}
    >
      <div className='OutputCard__info-wrapper' onClick={selectHandler}>
        <div className='OutputCard_name'>
          <h1>{name}</h1>
        </div>

        <span>{invoice_date.slice(0, 10)}</span>
        <span>{service_date ? service_date.slice(0, 10) : ''}</span>
        <span>{invoice_number}</span>

        <div className='OutputCard_amount'>
          <span>
            {Number(invoice_amount / exchangeRate).toFixed(2) + ' EUR'}
          </span>
          <span className='secondary-text'>
            {currency === 'eur' ? '' : `(${invoice_amount} ${currency})`}
          </span>
        </div>

        <div className='actions_wrapper'>
          <CustomButton
            type={comment ? 'comment' : ''}
            commentText={comment}
          ></CustomButton>
          <CustomButton
            className='reminder-button'
            type={'reminder'}
            onClick={reminderHandler}
            toggle={currentReminder}
          ></CustomButton>
          <CustomButton type={'edit'} onClick={editHandler}></CustomButton>
          <CustomButton type={'delete'} onClick={deleteHandler}></CustomButton>
        </div>
      </div>
    </StyledOutputCard>
  );
}

export default OutputCard;
