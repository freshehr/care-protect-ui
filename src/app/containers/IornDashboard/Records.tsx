import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { IornCharts } from './iornCharts';

const Records = () => {
  const classes = useStyles();
  const ref = React.useRef(null);

  return (
    <Grid item xs={6} sm={6} md={6}>
      <IornCharts />
    </Grid>
  );
};
export default Records;
