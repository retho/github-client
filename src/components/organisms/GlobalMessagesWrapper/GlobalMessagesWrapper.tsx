import React from 'react';
import './style.scss';
import GlobalMessage from './GlobalMessage';
import { range } from 'lodash-es';

export interface IGlobalMessagesWrapperProps {}
const GlobalMessagesWrapper: React.FC<IGlobalMessagesWrapperProps> = () => {
  return (
    <div className="GlobalMessagesWrapper">
      <GlobalMessage
        className="GlobalMessagesWrapper__message"
        message={{
          type: 'success',
          title: 'Unexpected error',
          description: 'Please, reload the page.',
        }}
      />
      <GlobalMessage
        className="GlobalMessagesWrapper__message"
        message={{
          type: 'info',
          title: 'Unexpected error',
          description: 'Please, reload the page.',
        }}
      />
      <GlobalMessage
        className="GlobalMessagesWrapper__message"
        message={{
          type: 'warning',
          title: 'Unexpected error',
          description: 'Please, reload the page.',
        }}
      />
      {range(0, 10).map((_, i) => (
        <GlobalMessage
          key={i}
          className="GlobalMessagesWrapper__message"
          message={{
            type: 'error',
            title: 'Unexpected error',
            description:
              'Application may not work properly.\nPlease, reload the page.',
          }}
        />
      ))}
    </div>
  );
};

export default GlobalMessagesWrapper;
