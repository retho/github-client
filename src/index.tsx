import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'normalize.css';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'components/atoms/ThemeProvider';
import MediaProvider from 'components/atoms/MediaProvider';

const render = () => {
  const Router = require('./router').default;

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <MediaProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </MediaProvider>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./router', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
