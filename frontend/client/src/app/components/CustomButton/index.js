import './index.css';
import { useState } from 'react';
import CommentCard from '../CommentCard';

function CustomButton({ onClick, commentText, type, toggle }) {
  const [visibleComment, setVisibleComment] = useState(false);

  const mouseEnterHandler = () => {
    setVisibleComment(true);
  };

  const mouseLeaveHandler = () => {
    setVisibleComment(false);
  };

  switch (type) {
    case 'comment':
      return (
        <button
          className='CustomButton'
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <img
            src={require('./../../../images/comment.png')}
            alt='comment'
            onClick={onClick}
          ></img>

          {visibleComment && <CommentCard>{commentText}</CommentCard>}
        </button>
      );
    case 'delete':
      return (
        <button className='CustomButton'>
          <img
            src={require('./../../../images/delete.png')}
            alt='delete'
            onClick={onClick}
          ></img>
        </button>
      );
    case 'reminder':
      return (
        <button className='CustomButton'>
          <img
            src={
              toggle
                ? require('./../../../images/reminder-true.png')
                : require('./../../../images/reminder-false.png')
            }
            alt='reminder'
            onClick={onClick}
          ></img>
        </button>
      );
    case 'edit':
      return (
        <button className='CustomButton'>
          <img
            src={require('./../../../images/edit.png')}
            alt='edit'
            onClick={onClick}
          ></img>
        </button>
      );
    default:
      return null;
  }
}

export default CustomButton;
