// @flow strict
import {
  REQUEST_ME,
  RECEIVE_ME,
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from '../actions';
import type { Action, UserState } from '../types';
import { getCookie } from '../utils/authfetch';

const defaultState = {
  isFetching: !!getCookie('authtoken')
};

export default function user(state: UserState = defaultState, action: Action) {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_ME:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ME:
      return Object.assign({}, state, {
        isFetching: false,
        loggedInUser: action.payload.me
      });
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload
      });
    default:
      return state;
  }
}
