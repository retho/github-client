import React from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import { useDispatch } from 'react-redux';
import { hideMessage } from 'store/slices/globalMessages';

export interface IGlobalMessage {
  id: number;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}
export interface IGlobalMessageProps {
  className?: string;
  message: IGlobalMessage;
}
const GlobalMessage: React.FC<IGlobalMessageProps> = ({
  className,
  message,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideMessage(message.id));
  };

  return (
    <div
      className={cn(
        'GlobalMessage',
        `GlobalMessage--type_${message.type}`,
        className
      )}
    >
      <SvgIcon
        className="GlobalMessage__x"
        type="octicon-x"
        onClick={handleClose}
      />
      <h4>{message.title}</h4>
      <p>
        {message.description.split('\n').map((x, i) => (
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
