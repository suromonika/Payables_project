import './index.css';

function InputElement({
  type,
  name,
  children,
  onChange,
  value,
  id,
  labelId,
  textarea,
}) {
  return textarea ? (
    <div className='InputElement'>
      <label htmlFor={labelId}>{children}</label>
      <textarea
        rows={'3'}
        cols={'21'}
        value={value}
        name={name}
        onChange={onChange}
        id={id}
      >
        {' '}
      </textarea>
    </div>
  ) : (
    <div className='InputElement'>
      <label htmlFor={labelId}>{children}</label>
      <input
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}

export default InputElement;
