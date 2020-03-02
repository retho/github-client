import React from 'react';
import { createRoute } from '../core';
import IconPage from 'components/pages/IconsPage';

type Params = null;
type QueryParams = null;
export default createRoute<Params, QueryParams>({
  pattern: '/icons',
  render: () => <IconPage />,
});
