// Login Form using FORMIK------------------------
import React, { useContext } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Toast } from '../../utils/Toast';

function ResetPasswordForm() {
  const router = useRouter();
  const { showMessage } = useContext(Toast);

  // ---------------------------------
  const handleSubmit = async (values, submitProps) => {
    try {
      const { data } = await axios.patch('/expressapi/resetpassword', values);
      showMessage(data.message);
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
        type: 'text',
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
      {
        component: 'text-field',
        name: 'otp',
        label: 'OTP',
        type: 'text',
        validate: [
          {
            type: 'exact-length',
            threshold: 6,
            message: 'Must be exactly 6 digits',
          },
          {
            type: 'required',
            message: 'OTP is required',
          },
          {
            type: 'pattern',
            pattern: '^[0-9]+$',
            message: 'Must be only digits',
          },
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
          {
            type: 'required',
            message: 'Password is required',
          },
          {
            type: 'pattern',
          },
        ],
      },
      {
        component: 'text-field',
        name: 'confirm_password',
        label: 'Confirm Password',
        type: 'password',
        isRequired: true,
        validate: [
          {
            type: 'required',
            message: 'Password is required',
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
            <LockResetIcon />
          </Avatar>
          <Typography variant="h5">Reset Password</Typography>
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

export default ResetPasswordForm;
