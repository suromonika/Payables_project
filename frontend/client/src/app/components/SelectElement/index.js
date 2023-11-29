import './index.css';

function SelectElement({ onChange, selectionData }) {
  return (
    <select className='SelectElement' onChange={onChange}>
      {selectionData.map((item) => {
        return item === 'all' ? (
          <option value={item} key={item} defaultValue>
            {item}
          </option>
        ) : (
          <option value={item} key={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default SelectElement;
