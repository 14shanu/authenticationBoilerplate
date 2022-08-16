// Login Form using FORMIK------------------------
import React, { useState, useContext, useRef } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Grid, Link, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Context } from '../../context';
import { Toast } from '../../utils/Toast';

function LoginForm() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { showMessage } = useContext(Toast);

  // --------------------

  const componentMapper = {
    [componentTypes.TEXT_FIELD]: TextField,
  };
  // ---------Schema---------
  const schema = {
    fields: [
      {
        component: 'text-field',
        name: 'email',
        label: 'Email',
        type: 'text',
        validate: [
          {
            type: 'pattern',
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
            message: 'Enter Valid Email',
          },
          { type: 'required', message: 'Email is required' },
        ],
        isRequired: true,
      },
      {
        component: 'text-field',
        name: 'password',
        label: 'Password',
        type: 'password',
        isRequired: true,
        validate: [
          { type: 'required', message: 'Password is required' },
          {
            type: 'min-length',
            threshold: 8,
            message: 'Minimum 8 Characters are required',
          },
        ],
      },
    ],
  };

  // -------------
  const handleSubmit = async values => {
    try {
      const { data } = await axios.post('/expressapi/login', values);
      console.log("65:", data)
      dispatch({
        type: 'LOGIN',
        payload: data.user,
      });
      //Save In LocalStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      showMessage(data.message);
      router.push('/');
    } catch (error) {
      console.log("75:", error)
      showMessage(error.response?.data?.message, 'error');
    }
  };

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 300,
    margin: '30px auto',
  };

  const avatarStyle = {
    backgroundColor: 'blue',
  };

  const LogoStyle = {};
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LoginIcon />
          </Avatar>
          <Typography variant="h5">Login</Typography>
        </Grid>

        <FormRenderer
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          schema={schema}
          onSubmit={handleSubmit}
        />

        <Grid align="center" style={LogoStyle}>
          <Link href="../register" underline="none">
            <Typography variant="caption" display="block" gutterBottom>
              Don't have an account? Sign up
            </Typography>
          </Link>
          <Link href="../user/forgotpassword" underline="none">
            <Typography variant="caption" display="block" gutterBottom>
              Forgot your password ?
            </Typography>
          </Link>
          <img
            src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
            width="140"
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default LoginForm;
