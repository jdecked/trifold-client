// @flow strict
// $FlowFixMe: No type annotations inside third-party lib redux
import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default createStore(rootReducer);
