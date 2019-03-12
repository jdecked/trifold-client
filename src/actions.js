// @flow strict
import { authfetch } from './utils/authfetch';
import type { Data, Dispatch, Action } from './types';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const REQUEST_ME = 'REQUEST_ME';
export const RECEIVE_ME = 'RECEIVE_ME';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export function updateScore(score: number) {
  return {
    type: UPDATE_SCORE,
    payload: {
      score
    }
  };
}

export function requestMe(): Action {
  return {
    type: REQUEST_ME,
    payload: {}
  };
}

export function receiveMe(user: { email: string }): Action {
  return {
    type: RECEIVE_ME,
    payload: {
      me: user
    }
  };
}

export function fetchMe() {
  return (dispatch: Dispatch) => {
    dispatch(requestMe());
    authfetch('/api/v1/users/me').then(user => dispatch(receiveMe(user)));
  };
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    payload: {}
  };
}

export function receiveLogin(data: Data) {
  return {
    type: RECEIVE_LOGIN,
    payload: {
      loggedInUser: data.user
    }
  };
}

export function fetchLoggedInUser(idToken: string) {
  return (dispatch: Dispatch) => {
    dispatch(requestLogin());
    fetch('/api/v1/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'post',
      body: JSON.stringify({
        id_token: idToken
      })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(receiveLogin(data));
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        // TODO (jdc): add '; secure' to ensure transport only via HTTPS
        document.cookie = `authtoken=${
          data.token
        }; expires=${date.toUTCString()}; path=/`;
      });
  };
}
