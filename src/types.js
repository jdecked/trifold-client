// @flow strict
import {
  UPDATE_SCORE,
  REQUEST_ME,
  RECEIVE_ME,
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from './actions';

export type UserState = {
  loggedInUser?: ?{ email: string },
  isFetching: boolean
};

export type ScoreState = {|
  score: number
|};

export type State = {
  score: ScoreState,
  user: UserState
};

export type ActionType =
  | typeof UPDATE_SCORE
  | typeof REQUEST_ME
  | typeof RECEIVE_ME
  | typeof REQUEST_LOGIN
  | typeof RECEIVE_LOGIN;

export type Data = {
  token?: string,
  user: ?{ email: string }
};

export type Action = {
  type: ActionType,
  payload: {
    score?: number,
    me?: ?{ email: string },
    loggedInUser?: ?{ email: string }
  }
};

export type PromiseAction = Promise<Action> | Promise<void>;
export type NormalDispatch = (action: Action | PromiseAction | void) => void;
export type GetState = () => State;
export type Thunk<A> = (
  (NormalDispatch, GetState) => Promise<void> | void
) => A;
export type Dispatch = NormalDispatch & Thunk<Action>;
