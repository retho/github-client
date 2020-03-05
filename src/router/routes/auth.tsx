import React from 'react';
import { createRoute } from '../core';
import AuthPage from 'components/pages/AuthPage';

type Params = null;
type QueryParams = null;
export default createRoute<Params, QueryParams>({
  pattern: '/auth',
  render: () => <AuthPage />,
});
