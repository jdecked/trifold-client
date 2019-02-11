// @flow strict
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { ComponentType } from 'react';

type AuthRouteType = {
  component: ComponentType<{}>,
  isAuthenticated: boolean,
  rest?: Array<{}>
};

const AuthRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: AuthRouteType) => {
  if (isAuthenticated) {
    return (
      // $FlowFixMe: Route typing is exact, spread is not
      <Route {...rest} render={props => <Component {...props} />} />
    );
  }
  return (
    // $FlowFixMe: Route typing is exact, spread is not
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )}
    />
  );
};

export default AuthRoute;
