import { UPDATE_SCORE } from '../actions';

export default function score(state = 0, action) {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload.score;
    default:
      return state;
  }
}
