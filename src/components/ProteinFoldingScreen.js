// @flow strict
import React, { Component } from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import { withStyles } from '@material-ui/core/styles';
import threeEntryPoint from '../threejs/threeEntryPoint';
import ScorebarContainer from '../containers/ScorebarContainer';

const styles = () => ({
  container: {
    textAlign: 'center',
    height: '100%',
    width: '100%'
  }
});

type Props = {|
  classes: typeof styles
|};

class ProteinFoldingScreen extends Component<Props> {
  // eslint-disable-next-line react/sort-comp
  threeRootElement: ?HTMLDivElement;

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  setThreeRef(element: ?HTMLDivElement) {
    this.threeRootElement = element;
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.container}
        ref={element => this.setThreeRef(element)}
      >
        <ScorebarContainer />
      </div>
    );
  }
}

export default withStyles(styles)(ProteinFoldingScreen);
