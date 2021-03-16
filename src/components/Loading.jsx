import React from 'react';
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
} from '@material-ui/core';

const useStyle = makeStyles((theme) =>
  createStyles({
    loading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0)',
    },
  })
);

export const Loading = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.loading}>
      <CircularProgress color="primary" />
    </Paper>
  );
};
