// @flow strict
import React from 'react';
import { render } from 'react-dom';
// $FlowFixMe: No type annotations inside third-party lib react-redux
import { Provider } from 'react-redux';

// $FlowFixMe: Type annotation needed for serviceWorker
import * as serviceWorker from './serviceWorker';

import App from './App';
import store from './store';
import './styles/index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
