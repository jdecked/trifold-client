// @flow strict
import { connect } from 'react-redux';
import App from '../components/App';
import { fetchMe } from '../actions';
import type { State, Dispatch } from '../types';

type Props = {|
  loggedInUser?: ?{ email: string },
  isFetching: boolean,
  fetchLoggedInUser: () => void
|};

const mapStateToProps = (state: State) => ({
  isFetching: state.user.isFetching,
  loggedInUser: state.user.loggedInUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // $FlowFixMe: Typing thunks is broken.
  fetchLoggedInUser: () => dispatch(fetchMe())
});

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(App);
