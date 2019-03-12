// @flow strict
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import '../styles/App.scss';
import ProteinFoldingScreen from './ProteinFoldingScreen';
import Home from './Home';
import LoginContainer from '../containers/LoginContainer';
import AuthRoute from './AuthRoute';
import LoadingScreen from './LoadingScreen';
import { getCookie } from '../utils/authfetch';

type Props = {
  loggedInUser: ?{ email: string },
  isFetching: boolean,
  fetchLoggedInUser: () => void
};

export default class App extends Component<Props> {
  async componentWillMount() {
    const { fetchLoggedInUser } = this.props;

    if (getCookie('authtoken')) {
      await fetchLoggedInUser();
    }
  }

  redirect = (routerProps: ContextRouter) => {
    const { loggedInUser } = this.props;

    if (loggedInUser) {
      return <Redirect to="/home" />;
    }

    return (
      <Redirect
        to={{ pathname: '/login', state: { from: routerProps.location } }}
      />
    );
  };

  renderLogin = (routerProps: ContextRouter) => {
    const { loggedInUser } = this.props;

    if (loggedInUser) {
      return <Redirect to="/home" />;
    }

    return <LoginContainer history={routerProps.history} />;
  };

  render() {
    const { isFetching } = this.props;

    return isFetching ? (
      <LoadingScreen />
    ) : (
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/fold" component={ProteinFoldingScreen} />
          <AuthRoute path="/home" component={Home} />
          <Route path="/login" render={this.renderLogin} />
          <Route path="/" render={this.redirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}
