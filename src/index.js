// @flow strict
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// $FlowFixMe: material-ui has no up-to-date types :(
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// $FlowFixMe: Type annotation needed for serviceWorker
// import * as serviceWorker from './serviceWorker';

import AppContainer from './containers/AppContainer';
import store from './store';
import './styles/index.scss';

const rootElement = document.getElementById('root');
// TODO (jdc): Remove on next major material-ui version release
// eslint-disable-next-line no-underscore-dangle
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#09814A',
      dark: '#005321',
      contrastText: '#FFFFFF'
    },
    typography: {
      fontSize: 16
    },
    secondary: {
      light: '#577363',
      main: '#2D4739',
      dark: '#062013',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#616161',
      secondary: '#707070'
    }
  }
});

if (rootElement) {
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    </Provider>,
    rootElement
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
