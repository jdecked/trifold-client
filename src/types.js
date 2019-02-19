// @flow strict
import { UPDATE_SCORE } from './actions';

export type State = {|
  score: number
|};

export type ActionType = typeof UPDATE_SCORE;

export type Action = {|
  type: ActionType,
  payload: {
    score: number
  }
|};

export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | PromiseAction) => void;
export type GetState = () => State;

export type Data = {
  token: string
};
