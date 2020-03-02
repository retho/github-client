import React from 'react';
import { createRoute } from '../core';
import IconPage from 'components/pages/IconsPage';

type Params = 'iconType';
type QueryParams = null;
export default createRoute<Params, QueryParams>({
  pattern: '/icons/:iconType',
  render: ({ iconType }) => <IconPage selectedIcon={iconType} />,
});
