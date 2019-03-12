// @flow strict
import { connect } from 'react-redux';
import Login from '../components/Login';
import { fetchLoggedInUser } from '../actions';
import type { State, Dispatch, Action, Thunk } from '../types';

type Props = {|
  loggedInUser?: ?{ email: string },
  isFetching: boolean,
  setLoggedInUser: string => Dispatch => Thunk<Action>
|};

const mapStateToProps = (state: State) => ({
  isFetching: state.user.isFetching,
  loggedInUser: state.user.loggedInUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // $FlowFixMe: Typing thunks is broken.
  setLoggedInUser: (idToken: string) => dispatch(fetchLoggedInUser(idToken))
});

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
