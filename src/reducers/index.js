// @flow strict
import { combineReducers } from 'redux';
import scoreReducer from './score';
import userReducer from './user';
import type { Action } from '../types';

const reducers = {
  score: scoreReducer,
  user: userReducer
};

export type Reducers = typeof reducers;

export default combineReducers<_, Action>(reducers);
