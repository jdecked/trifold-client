// @flow strict
import React from 'react';
// $FlowFixMe: material-ui has no up-to-date types :(
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: theme.spacing.unit * 50,
    height: theme.spacing.unit * 2.5,
    borderRadius: theme.shape.borderRadius / 2,
    border: `1px solid ${theme.palette.secondary.light}`,
    display: 'inline-flex',
    position: 'absolute',
    bottom: 0,
    right: 0
  },

  scoreArea: {
    backgroundColor: theme.palette.primary.light
  },

  text: {
    color: theme.palette.secondary.dark,
    position: 'absolute',
    width: 'inherit',
    bottom: 0,
    top: 0
  }
});

type Props = {|
  score: number,
  classes: typeof styles
|};

const Scorebar = (props: Props) => {
  const { score, classes } = props;

  return (
    <div className={classes.container}>
      <span className={classes.scoreArea} style={{ width: `${score}%` }} />
      <span className={classes.text}>{score}</span>
    </div>
  );
};

export default withStyles(styles)(Scorebar);
