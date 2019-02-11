// @flow strict
import React, { Component } from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import Button from '@material-ui/core/Button';
import GoogleLogo from './GoogleLogo';
import '../styles/Login.scss';

type Props = {
  handleLogIn: ({}) => void
};

type GoogleUser = {
  getAuthResponse: () => { idToken: string }
};

class Login extends Component<Props> {
  /* eslint-disable react/sort-comp */
  googleButton: ?HTMLElement;

  auth2: () => void;
  /* eslint-enable react/sort-comp */

  componentDidMount() {
    this.initializeGoogleLogin();
  }

  onLogin(googleUser: GoogleUser) {
    const { idToken } = googleUser.getAuthResponse();
    const { handleLogIn } = this.props;

    fetch('/api/v1/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'post',
      body: JSON.stringify({
        idToken
      })
    })
      .then(response => response.json())
      .then(data => {
        handleLogIn(data);
      });
  }

  attachLogin(element: ?HTMLElement) {
    if (element) {
      this.auth2.attachClickHandler(element, {}, googleUser => {
        this.onLogin(googleUser);
      });
    }
  }

  initializeGoogleLogin() {
    window.gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      // TODO (jdc): Turn client_id into an env variable
      this.auth2 = window.gapi.auth2.init({
        client_id:
          '121062910806-hi9gi8sm3g1or6k88bilq8quk1do71bs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });

      this.attachLogin(this.googleButton);
    });
  }

  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-content">
          <Button
            variant="contained"
            color="primary"
            ref={googleButton => {
              this.googleButton = googleButton;
            }}
          >
            Log In
            <GoogleLogo />
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
