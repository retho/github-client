import React from 'react';
import { createRouteRender } from '../core';
import MainLayout from 'components/templates/MainLayout';
import HomePage from 'components/pages/HomePage';

type Params = null;
type QueryParams = null;
export default createRouteRender<Params, QueryParams>(() => (
  <MainLayout>
    <HomePage />
  </MainLayout>
));
