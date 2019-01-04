// @flow strict

export type State = {
  score: number
};

export type Action = {
  type: string,
  payload: {}
};

export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | PromiseAction) => void;
export type GetState = () => State;
