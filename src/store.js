// @flow strict
import { createStore, applyMiddleware } from 'redux';
// $FlowFixMe: redux-thunk has no type definitions
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import type { State, Action, Dispatch } from './types';

// $FlowFixMe: Typing with thunks is infuriatingly broken
export default createStore<State, Action, Dispatch>(
  rootReducer,
  applyMiddleware(thunk)
);
