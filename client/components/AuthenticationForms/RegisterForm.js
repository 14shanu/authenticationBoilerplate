import React, { useState, useContext } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Toast } from '../../utils/Toast';

function RegisterForm() {
  const { showMessage } = useContext(Toast);
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async values => {
    console.log(values);

    try {
      const { data } = await axios.post('/expressapi/register', values);

      showMessage('Registered Succesfully');
      router.push(`/user/emailverification?email=${values.email}`);
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };

  // ------------------
  const schema = {
    fields: [
      {
        component: 'text-field',
        name: 'first_name',
        label: 'First Name',
        isRequired: true,
        validate: [
          {
            type: 'required',
            message: 'Required',
          },
          {
            type: 'pattern',
            pattern: '^[A-Za-z ]*$',
            message: 'Please enter valid name',
          },
          {
            type: 'pattern',
          },
        ],
        type: 'text',
      },
      {
        component: 'text-field',
        name: 'last_name',
        isRequired: false,
        validate: [
          {
            type: 'pattern',
            pattern: '^[A-Za-z ]*$',
            message: 'Please enter valid name',
          },
        ],
        label: 'Last Name',
        type: 'text',
      },
      {
        component: 'text-field',
        name: 'email',
        initialValue: '',
        validate: [
          {
            type: 'pattern',
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
            message: 'Enter valid email',
          },
          {
            type: 'required',
            message: 'Email is required',
          },
        ],
        isRequired: true,
        label: 'Email',
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
            message: 'Required',
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
  // -----------------------------
  const avatarStyle = {
    backgroundColor: 'blue',
  };

  // --------------------------
  const checkStatus = () => {
    if (showToast) {
      router.push('/user/emailverification');
    }
  };
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">Register</Typography>
        </Grid>

        <FormRenderer
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          schema={schema}
          onSubmit={handleSubmit}
        />
        <Grid align="center">
          <img
            src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
            width="140"
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default RegisterForm;
