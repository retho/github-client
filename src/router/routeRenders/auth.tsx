import React from 'react';
import { createRouteRender } from '../core';
import AuthPage from 'components/pages/AuthPage';

type Params = null;
type QueryParams = null;
export default createRouteRender<Params, QueryParams>(() => <AuthPage />);
