import React, { useState, useContext, useRef } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Box,
  Link,
  Paper,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormControl } from '../formComponents/FormControl';
import axios from 'axios';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import { Toast } from '../../utils/Toast';

const RegisterForm = () => {
  const router = useRouter();

  const { showMessage } = useContext(Toast);
  // -----------------------------Initial Values-------------------
  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  // -------------------------------Validation Schema---------------
  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(50)
      .required('Required'),
    last_name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(50)
      .required('Required'),
    email: yup.string().email('Invalid Email Format').required('Required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });
  // -------------------------------------------------
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  // --------------onSubmit FXN---------------------
  const onSubmit = async values => {
    console.log(values);

    try {
      const { data } = await axios.post('/expressapi/register', values);

      showMessage('Registered Succesfully');
      router.push(`/user/emailverification?email=${values.email}`);
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };

  // ------------CSS Styles------------------------------------------

  const avatarStyle = {
    backgroundColor: '#86198f',
  };
  // -----------------React Hook Form-------------------------

  return (
    <React.Fragment>
      {/*******Login Form***********/}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={4}
          square
          sx={{ backgroundColor: '#f3f4f6', height: 'auto' }}
        >
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <img
                src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
                width="140"
              />
            </Box>
            <Avatar style={avatarStyle}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    compType="input"
                    name="first_name"
                    label="First Name"
                    control={control}
                    margin="normal"
                    required
                    // variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    compType="input"
                    name="last_name"
                    label="Last Name"
                    control={control}
                    margin="normal"
                    required
                    // variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  compType="input"
                  name="email"
                  label="Email"
                  control={control}
                  margin="normal"
                  required
                  // variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  compType="input"
                  name="password"
                  type="password"
                  label="Password"
                  control={control}
                  margin="normal"
                  required
                  // variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  compType="input"
                  name="confirm_password"
                  type="password"
                  label="Confirm Password"
                  control={control}
                  margin="normal"
                  required
                  // variant="outlined"
                />
              </Grid>
              {/*-----------Submit Button-------------- */}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>

              <Grid item align="right">
                <Link href="../login" variant="caption" underline="none">
                  Already have an account? Login
                </Link>
              </Grid>
            </form>
          </Box>
        </Grid>
        {/*******Image or Text***********/}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default RegisterForm;
