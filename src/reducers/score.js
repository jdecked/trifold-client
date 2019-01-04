// @flow strict
import { UPDATE_SCORE } from '../actions';
import type { Action } from '../types';

export default function score(state: number = 0, action: Action) {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload.score;
    default:
      return state;
  }
}
