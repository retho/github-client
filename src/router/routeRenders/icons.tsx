import React from 'react';
import { createRouteRender } from '../core';
import IconPage from 'components/pages/IconsPage';

type Params = null;
type QueryParams = null;
export default createRouteRender<Params, QueryParams>(() => <IconPage />);
