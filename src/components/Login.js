// @flow strict
import React, { Component } from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import Button from '@material-ui/core/Button';
// $FlowFixMe: material-ui has no up-to-date types :(
import { withStyles } from '@material-ui/core/styles';
import type { RouterHistory } from 'react-router-dom';
import GoogleLogo from './GoogleLogo';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  textLabel: {
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing.unit
  },
  button: {
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 2.5}px`
  }
});

type Props = {
  setLoggedInUser: string => void,
  classes: typeof styles,
  history: RouterHistory
};

type GoogleUser = {
  getAuthResponse: () => { id_token: string }
};

class Login extends Component<Props> {
  /* eslint-disable react/sort-comp */
  googleButton: ?HTMLElement;

  auth2: () => { attachClickHandler: (HTMLElement, {}, GoogleUser) => void };
  /* eslint-enable react/sort-comp */

  componentDidMount() {
    this.initializeGoogleLogin();
  }

  onLogin = (googleUser: GoogleUser) => {
    const { history, setLoggedInUser } = this.props;
    const idToken = googleUser.getAuthResponse().id_token;

    setLoggedInUser(idToken);
    history.push('/home');
  };

  attachLogin = (element: ?HTMLElement) => {
    if (element) {
      this.auth2.attachClickHandler(element, {}, googleUser => {
        this.onLogin(googleUser);
      });
    }
  };

  initializeGoogleLogin() {
    // window isn't guaranteed to be loaded in time for every build
    if (window && window.gapi) {
      window.gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID
        });

        this.attachLogin(this.googleButton);
      });
    } else if (global && global.gapi) {
      global.gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = global.gapi.auth2.init({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID
        });

        this.attachLogin(this.googleButton);
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          buttonRef={googleButton => {
            this.googleButton = googleButton;
          }}
        >
          <GoogleLogo />
          <span className={classes.textLabel}>Log In</span>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
