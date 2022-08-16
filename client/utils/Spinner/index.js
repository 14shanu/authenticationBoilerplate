import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
export const Spinner = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress color="success" size={60} thickness={4} />
      </Grid>
    </div>
  );
};
