import React from 'react';
import { createRouteRender } from '../core';
import DemoPage from 'components/pages/DemoPage';

type Params = null;
type QueryParams = null;
export default createRouteRender<Params, QueryParams>(() => (
  <DemoPage subject="theme" />
));
