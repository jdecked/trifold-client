// @flow strict
import { connect } from 'react-redux';
import Scorebar from '../components/Scorebar';
import type { State } from '../types';

type Props = {|
  score: number
|};

const mapStateToProps = (state: State) => state;

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  {}
)(Scorebar);
