// @flow strict
import React from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    fontFamily: 'Courier New, monospace',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    paddingTop: theme.spacing.unit,
    fontSize: theme.spacing.unit * 4
  }
});

type Props = {|
  classes: typeof styles
|};

const LevelSelect = (props: Props) => {
  const { classes } = props;

  return (
    <Link to="/fold" className={classes.container}>
      <div>Level 1: Chignolin</div>
      <div>Click anywhere to continue</div>
    </Link>
  );
};

export default withStyles(styles)(LevelSelect);
