// @flow strict

export const UPDATE_SCORE = 'UPDATE_SCORE';

export function updateScore(score: number) {
  return {
    type: UPDATE_SCORE,
    payload: {
      score
    }
  };
}
