import React from 'react';
import {render} from '@testing-library/react';
import Router from 'router';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter} from 'react-router-dom';

test('renders without errors', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
});
