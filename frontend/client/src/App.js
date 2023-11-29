import { fetchData, fetchCurrencyData } from './store/store';
import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import OutputCard from './app/components/OutputCard';
import InputCard from './app/components/InputCard';
import Logo from './app/components/Logo';
import Filter from './app/components/Filter';
import Totals from './app/components/Totals';
import ExpensesChart from './app/components/ExpensesChart';
import ExplanationBar from './app/components/ExplanationBar';

function App() {
  const [filteredByName, setFilteredByName] = useState('all');
  const [filteredByYear, setFilteredByYear] = useState('all');
  const [filteredByMonth, setFilteredByMonth] = useState('all');
  const [filteredByStatus, setFilteredByStatus] = useState('Unpaid');
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const uniqueNames = [...new Set(data.map((item) => item.name)), 'all'];
  const uniqueDates = [
    ...new Set(data.map((item) => item.invoice_date.slice(0, 4))),
    'all',
  ];

  const months = [...Array.from(Array(13).keys()), 'all'];
  //Removing value 0
  months.shift();

  const status = [...new Set(data.map((item) => item.status)), 'all'];

  useEffect(() => {
    // Fetch data when the component mounts or whenever needed
    dispatch(fetchData());
    dispatch(fetchCurrencyData());
  }, [dispatch, filteredByYear]);

  const sortedData = [...data].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const filteredInvoices = sortedData.filter((item) => {
    const invoiceYear = new Date(item.invoice_date).getUTCFullYear().toString();
    const invoiceMonth = new Date(item.invoice_date).getUTCMonth();

    if (
      (filteredByName === 'all' || item.name.includes(filteredByName)) &&
      (filteredByYear === 'all' || invoiceYear === filteredByYear) &&
      (filteredByMonth === 'all' ||
        (invoiceMonth + 1).toString() === filteredByMonth) &&
      (filteredByStatus === 'all' || item.status === filteredByStatus)
    ) {
      return true;
    }
    return false;
  });

  const handleNewData = async (newData) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        dispatch(fetchData());
      } else {
        console.log('Error occurred while saving data');
      }
    } catch (error) {
      console.log('Error occurred while saving data', error);
    }
  };

  const companyNameFilterHandler = (e) => {
    setFilteredByName(e.target.value);
  };

  const changeYearsHandler = (e) => {
    setFilteredByYear(e.target.value);
  };

  const changeMonthsHandler = (e) => {
    setFilteredByMonth(e.target.value);
  };

  const changeStatusHandler = (e) => {
    setFilteredByStatus(e.target.value);
  };

  const editHandler = (data) => {
    setEditData(data);
    setIsEditing(true);
  };
  return (
    <div className='App'>
      <div className='App_container'>
        <Logo></Logo>
        <InputCard
          handleNewData={handleNewData}
          id={editData ? editData._id : null}
          editData={editData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setEditData={setEditData}
        ></InputCard>
        <Filter
          onChangeNames={companyNameFilterHandler}
          onChangeYears={changeYearsHandler}
          onChangeStatus={changeStatusHandler}
          onChangeMonths={changeMonthsHandler}
          uniqueNames={uniqueNames}
          uniqueDates={uniqueDates}
          months={months}
          status={status}
        ></Filter>

        {filteredByYear === 'all' ? (
          ''
        ) : (
          <ExpensesChart
            amounts={filteredInvoices}
            filteredByYear={filteredByYear}
          ></ExpensesChart>
        )}
        <ExplanationBar></ExplanationBar>

        <div className='OutputCard_wrapper'>
          {filteredInvoices.length === 0
            ? 'Loading...'
            : filteredInvoices.map((item) => {
                return (
                  <OutputCard
                    key={item._id}
                    name={item.name}
                    invoice_date={item.invoice_date}
                    service_date={item.service_date}
                    invoice_number={item.invoice_number}
                    id={item._id}
                    invoice_amount={item.invoice_amount}
                    currency={item.currency}
                    comment={item.comment}
                    status={item.status}
                    selected={item.to_pay}
                    onClickEdit={() => editHandler(item)}
                  ></OutputCard>
                );
              })}
        </div>
        <Totals></Totals>
      </div>
    </div>
  );
}

export default App;
