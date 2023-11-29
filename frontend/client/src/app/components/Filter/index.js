import React from 'react';
import './index.css';
import SelectElement from '../SelectElement';

function Filter({
  onChange,
  uniqueDates,
  uniqueNames,
  status,
  onChangeYears,
  onChangeMonths,
  months,
  onChangeNames,
  onChangeStatus,
}) {
  return (
    <div className='Filter' onChange={onChange}>
      <span className='Filter__label'>Filter by Status:</span>
      <SelectElement
        selectionData={status}
        onChange={onChangeStatus}
      ></SelectElement>
      <span className='Filter__label'>Filter by Year:</span>
      <SelectElement
        selectionData={uniqueDates}
        onChange={onChangeYears}
      ></SelectElement>
      <span className='Filter__label'>Filter by Month:</span>
      <SelectElement
        selectionData={months}
        onChange={onChangeMonths}
      ></SelectElement>
      <span className='Filter__label'>Filter by Company:</span>
      <SelectElement
        selectionData={uniqueNames}
        onChange={onChangeNames}
      ></SelectElement>
    </div>
  );
}

export default Filter;
