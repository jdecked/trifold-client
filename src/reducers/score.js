// @flow strict
import { UPDATE_SCORE } from '../actions';
import type { Action, ScoreState } from '../types';

const defaultState = {
  score: 0
};

export default function score(
  state: ScoreState = defaultState,
  action: Action
) {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload.score;
    default:
      return state;
  }
}
