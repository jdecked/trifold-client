// @flow strict
// $FlowFixMe: Typing not currently planned for react-redux
import { connect } from 'react-redux';
import Scorebar from '../components/Scorebar';
import { type State } from '../types';

const mapStateToProps = (state: State) => state;

export default connect(
  mapStateToProps,
  {}
)(Scorebar);
