import './index.css';
import cx from 'classnames';

function Button({ type, name, children, onClick, color }) {
  const className = cx('Button', {
    'Button--blue': color === 'blue',
  });

  return (
    <button type={type} name={name} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
