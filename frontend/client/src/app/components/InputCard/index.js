import { fetchData } from '../../../store/store';
import InputElement from '../InputElement';
import './index.css';
import Button from '../Button';
import SelectElement from '../SelectElement';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function InputCard({
  handleNewData,
  id,
  editData,
  isEditing,
  setIsEditing,
  setEditData,
}) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredServiceDate, setEnteredServiceDate] = useState('');
  const [enteredNumber, setEnteredNumber] = useState('');
  const [enteredComment, setEnteredComment] = useState('');
  const [currency, setCurrency] = useState('eur');
  const dispatch = useDispatch();
  const currencies = ['EUR', 'USD', 'JPY', 'CAD', 'GBP'];

  useEffect(() => {
    // Fetch data when the component mounts or whenever needed

    if (isEditing) {
      setEnteredName(editData.name || '');
      setEnteredAmount(editData.invoice_amount || '');
      setEnteredDate(editData.invoice_date || '');
      setEnteredServiceDate(editData.service_date || '');
      setEnteredNumber(editData.invoice_number || '');
      setEnteredComment(editData.comment || '');
      setCurrency(editData.currency || 'eur');
    }
  }, [dispatch, editData, isEditing]);

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  const serviceDateChangeHandler = (e) => {
    setEnteredServiceDate(e.target.value);
  };

  const numberChangeHandler = (e) => {
    setEnteredNumber(e.target.value);
  };

  const commentChangeHandler = (e) => {
    setEnteredComment(e.target.value);
  };

  const currencySelectorHandler = (e) => {
    setCurrency(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = enteredName.trim();
    const amount = enteredAmount.trim();
    const currencyName = currency.trim();
    const date = enteredDate.trim();
    const serviceDate = enteredServiceDate.trim();
    const number = enteredNumber.trim();
    const comment = enteredComment.trim();

    if (name === '' || amount === '' || date === '' || number === '') {
      console.log('Please fill in all the required fields.');
      return;
    }

    const enteredData = {
      name,
      invoice_amount: +amount,
      currency: currencyName,
      invoice_date: date,
      service_date: serviceDate,
      invoice_number: number,
      comment: comment,
      status: 'Unpaid',
      _id: id,
    };
    console.log('Entered Data:', enteredData);

    if (isEditing) {
      try {
        const response = await fetch(`/api/invoices/${editData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enteredData),
        });

        if (response.ok) {
          console.log('Entry successfully updated');
          setIsEditing(false);
          setEditData(null); // Clear edit data
          dispatch(fetchData()); // Fetch updated data
        } else {
          console.log('Error occurred while updating entry');
        }
      } catch (error) {
        console.log('Error occurred while updating entry', error);
      }
    } else {
      try {
        const response = await fetch('/api/invoices', {
          method: 'POST', // Use POST method for creating a new entry
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enteredData),
        });
        if (response.ok) {
          dispatch(fetchData());
        } else {
          console.log('Error occurred while saving data');
        }
      } catch (error) {
        console.log('Error occurred while saving data', error);
      }
    }

    setEnteredAmount('');
    setEnteredDate('');
    setEnteredServiceDate('');
    setEnteredName('');
    setEnteredNumber('');
    setEnteredComment('');
  };

  return (
    <div className='InputCard'>
      <form onSubmit={submitHandler}>
        <h1 className='InputCard_header'>Enter New Invoice</h1>
        <div className='Inputs'>
          <InputElement
            type={'text'}
            name={'name'}
            id={'name'}
            for={'name'}
            value={enteredName}
            onChange={nameChangeHandler}
          >
            Company name
          </InputElement>
          <div className='Inputs_invoice_amount_wrapper'>
            <InputElement
              type={'number'}
              name={'invoice_amount'}
              id={'number'}
              for={'number'}
              value={enteredAmount}
              onChange={amountChangeHandler}
            >
              Invoice Amount
            </InputElement>
            <SelectElement
              onChange={currencySelectorHandler}
              selectionData={currencies}
            ></SelectElement>
          </div>
          <InputElement
            type={'date'}
            name={'invoice_date'}
            id={'invoice_date'}
            for={'invoice_date'}
            value={enteredDate}
            onChange={dateChangeHandler}
          >
            Invoice Date
          </InputElement>

          <InputElement
            type={'date'}
            name={'service_date'}
            id={'service_date'}
            for={'service_date'}
            value={enteredServiceDate}
            onChange={serviceDateChangeHandler}
          >
            Service Date <span className='light-text'>(optional)</span>
          </InputElement>

          <InputElement
            type={'text'}
            name={'invoice_number'}
            value={enteredNumber}
            id={'invoice_number'}
            for={'invoice_number'}
            onChange={numberChangeHandler}
          >
            Invoice Number <span className='light-text'>(optional)</span>
          </InputElement>
          <InputElement
            textarea={'textarea'}
            name={'comment'}
            id={'commentr'}
            value={enteredComment}
            for={'comment'}
            onChange={commentChangeHandler}
          >
            Comment <span className='light-text'>(optional)</span>
          </InputElement>
        </div>
        <Button type={'submit'} name={'Submit'} color='blue'>
          {' '}
          Submit
        </Button>
      </form>
    </div>
  );
}

export default InputCard;
