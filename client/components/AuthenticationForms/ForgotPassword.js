import React, { useState, useContext, useRef } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Toast } from '../../utils/Toast';

function ForgotPasswordForm() {
  const toast = useRef(null);
  // const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { showMessage } = useContext(Toast);

  // -----------------------
  const handleSubmit = async values => {
    try {
      const { data } = await axios.patch('/expressapi/forgotpassword', values);

      showMessage(data.message);

      router.push('/user/resetpassword');
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };
  // ------------------
  const schema = {
    fields: [
      {
        component: 'text-field',
        name: 'email',
        label: 'Email',
        isRequired: true,
        validate: [
          {
            type: 'required',
            message: 'Email is required',
          },
          {
            type: 'pattern',
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
            message: 'Please enter the valid email',
          },
        ],
      },
    ],
  };
  // --------------------
  const componentMapper = {
    [componentTypes.TEXT_FIELD]: TextField,
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
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Forgot Password</Typography>
        </Grid>

        <FormRenderer
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          schema={schema}
          onSubmit={handleSubmit}
        />
        <Grid align="center" style={LogoStyle}>
          <img
            src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
            width="140"
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ForgotPasswordForm;
