import React from 'react';
import './style.scss';
import GlobalMessage from './GlobalMessage';
import { useSelector } from 'utils/redux';

export interface IGlobalMessagesWrapperProps {}
const GlobalMessagesWrapper: React.FC<IGlobalMessagesWrapperProps> = () => {
  const mgs = useSelector((state) => state.globalMessages.messages);

  return (
    <div className="GlobalMessagesWrapper">
      {mgs.map((x) => (
        <GlobalMessage
          key={x.id}
          className="GlobalMessagesWrapper__message"
          message={x}
        />
      ))}
    </div>
  );
};

export default GlobalMessagesWrapper;
