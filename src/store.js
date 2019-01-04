// @flow strict
import { createStore } from 'redux';
import type { Dispatch } from 'redux';
import rootReducer from './reducers/index';
import type { State, Action } from './types';

export default createStore<State, Action, Dispatch<Action>>(rootReducer);
