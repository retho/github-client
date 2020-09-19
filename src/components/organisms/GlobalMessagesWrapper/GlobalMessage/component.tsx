import React from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import {useDispatch} from 'react-redux';
import {hideMessage} from 'store/slices/globalMessages';

export type GlobalMessage = {
  id: number;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
};
export type GlobalMessageProps = {
  className?: string;
  message: GlobalMessage;
};
const GlobalMessage: React.FC<GlobalMessageProps> = (props) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideMessage(props.message.id));
  };

  return (
    <div
      className={cn('GlobalMessage', `GlobalMessage--type_${props.message.type}`, props.className)}
    >
      <SvgIcon className="GlobalMessage__x" type="octicon-x" onClick={handleClose} />
      <h4>{props.message.title}</h4>
      <p>
        {props.message.description.split('\n').map((x, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {x}
          </span>
        ))}
      </p>
    </div>
  );
};

export default GlobalMessage;
