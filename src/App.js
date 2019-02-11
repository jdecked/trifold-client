// @flow strict
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import './styles/App.scss';
import ProteinFoldingScreen from './components/ProteinFoldingScreen';
import Home from './components/Home';
import Login from './components/Login';
import AuthRoute from './components/AuthRoute';
import { authfetch } from './utils/authfetch';

type State = {
  loggedInUser: {}
};

type Data = {
  token: string
};

export default class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  setLoggedInUser(data: Data) {
    this.setState({
      loggedInUser: data
    });

    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    // TODO (jdc): add '; secure' to ensure transport only via HTTPS
    document.cookie = `authtoken=${
      data.token
    }; expires=${date.toUTCString()}; path=/`;

    authfetch('/')
      .then(response => response.json())
      .then(responseData => responseData);
  }

  redirect = (routerProps: ContextRouter) => {
    const { loggedInUser } = this.state;

    if (loggedInUser) {
      return <Redirect to="/home" />;
    }

    return (
      <Redirect
        to={{ pathname: '/login', state: { from: routerProps.location } }}
      />
    );
  };

  render() {
    const { loggedInUser } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <AuthRoute
            path="/fold"
            isAuthenticated={!!loggedInUser}
            component={ProteinFoldingScreen}
          />
          <AuthRoute
            path="/home"
            isAuthenticated={!!loggedInUser}
            component={Home}
          />
          <Route path="/login" component={Login} />
          <Route path="/" render={this.redirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}
