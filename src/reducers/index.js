// @flow strict
import { combineReducers } from 'redux';
import scoreReducer from './score';

const reducers = {
  score: scoreReducer
};

export type Reducers = typeof reducers;

export default combineReducers<Reducers, {}>(reducers);
