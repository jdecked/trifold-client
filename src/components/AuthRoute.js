// @flow strict
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { ComponentType } from 'react';
import type { State } from '../types';
import LoadingScreen from './LoadingScreen';

type AuthRouteType = {
  component: ComponentType<{}>,
  loggedInUser?: ?{ email: string },
  isFetching?: boolean,
  rest?: Array<{}>
};

type Props = {|
  component: ComponentType<{}>,
  loggedInUser?: ?{ email: string },
  isFetching: boolean
|};

type OwnProps = {|
  component: ComponentType<{}>
|};

const AuthRoute = ({
  component: Component,
  isFetching,
  loggedInUser,
  ...props
}: AuthRouteType) => {
  if (isFetching === true) {
    return <LoadingScreen />;
  }

  if (loggedInUser || global.gapi.auth2.getAuthInstance().isSignedIn.get()) {
    return (
      // $FlowFixMe: Route typing is exact, spread is not
      <Route {...props} render={routeProps => <Component {...routeProps} />} />
    );
  }
  return (
    // $FlowFixMe: Route typing is exact, spread is not
    <Route
      {...props}
      render={routeProps => (
        <Redirect
          to={{ pathname: '/login', state: { from: routeProps.location } }}
        />
      )}
    />
  );
};

const mapStateToProps = (state: State) => ({
  isFetching: state.user.isFetching,
  loggedInUser: state.user.loggedInUser
});

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(AuthRoute);
