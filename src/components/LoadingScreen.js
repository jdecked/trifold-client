// @flow strict
import React from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import CircularProgress from '@material-ui/core/CircularProgress';
// $FlowFixMe: material-ui has no up-to-date types :(
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  }
});

const LoadingScreen = ({ classes }) => (
  <div className={classes.container}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(LoadingScreen);
