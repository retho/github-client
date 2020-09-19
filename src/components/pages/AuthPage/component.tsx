import React, {useState} from 'react';
import './style.scss';
import {useDispatch} from 'react-redux';
import {setToken} from 'store/slices/auth';

const AuthPage: React.FC = () => {
  const [authToken, setAuthToken] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (authToken) {
      localStorage.setItem('auth_token', authToken);
      dispatch(setToken(authToken));
    }
  };

  return (
    <div className="AuthPage">
      <div className="AuthPage__content">
        Insert personal access token from{' '}
        {'`GitHub -> Settings -> Developer Settings -> Personal access tokens`'}
        <br />
        <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
          https://github.com/settings/tokens
        </a>
        <form onSubmit={handleSubmit}>
          <input
            className="AuthPage__input"
            placeholder="oauth token"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
