import React from 'react';
import { createRoute } from '../core';
import MainLayout from 'components/templates/MainLayout';
import HomePage from 'components/pages/HomePage';

type Params = null;
type QueryParams = null;
export default createRoute<Params, QueryParams>({
  pattern: '/',
  render: () => (
    <MainLayout>
      <HomePage />
    </MainLayout>
  ),
});
