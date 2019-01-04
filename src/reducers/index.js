// @flow strict
// $FlowFixMe: No type annotations inside third-party lib redux
import { combineReducers } from 'redux';
import scoreReducer from './score';

export default combineReducers({
  score: scoreReducer
});
