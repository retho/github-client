import React, { useState } from 'react';
import './style.scss';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'store/slices/auth';
import { RootState } from 'store';
import { routes } from 'router';
import { stringifyRoute } from 'utils/router';

const AuthPage: React.FC = () => {
  const [authToken, setAuthToken] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (authToken) {
      localStorage.setItem('auth_token', authToken);
      dispatch(setToken(authToken));
    }
  };

  const isAuthorized = useSelector((state: RootState) => !!state.auth.token);

  return isAuthorized ? (
    <Redirect to={stringifyRoute(routes.root, null, null)} />
  ) : (
    <div className="AuthPage">
      <div className="AuthPage__content">
        Insert personal access token from{' '}
        {'`GitHub -> Settings -> Developer Settings -> Personal access tokens`'}
        <br />
        <a href="https://github.com/settings/tokens">
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
