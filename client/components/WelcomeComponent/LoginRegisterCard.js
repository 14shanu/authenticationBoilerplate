// Login Form using FORMIK------------------------
import React, { useState, useContext, useRef } from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import { useRouter } from 'next/router';
import { Avatar, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';

function LoginRegisterCard() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  // const { state, dispatch } = useContext(Context);
  const router = useRouter();

  // --------------------

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 350,
    margin: '30px auto',
  };

  const avatarStyle = {
    backgroundColor: 'blue',
  };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <img
            src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
            width="140"
          />

          <Typography variant="h6">Welcome to Venerate Solution</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default LoginRegisterCard;
