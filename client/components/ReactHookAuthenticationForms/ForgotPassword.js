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
import LockIcon from '@mui/icons-material/Lock';
import { Toast } from '../../utils/Toast';

export const ForgotPassword = () => {
  const router = useRouter();
  const { showMessage } = useContext(Toast);
  //  -------Initial Values----------
  const defaultValues = {
    email: '',
  };
  // ---------Validation Schema------------------
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Format').required('Required'),
  });

  // ---------onSubmit-----------------------------
  const onSubmit = async values => {
    try {
      const { data } = await axios.patch('/expressapi/forgotpassword', values);

      showMessage(data.message);

      router.push(`/user/resetpassword?email=${values.email}`);
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };
  // ---------------------------
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  // -------------------------------------

  // ------------CSS Styles------------------------------------------

  const avatarStyle = {
    backgroundColor: '#86198f',
  };

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
              <LockIcon />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              Forgot Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                compType="input"
                name="email"
                label="Email"
                control={control}
                margin="normal"
                required
              />

              {/*-----------Submit Button-------------- */}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
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
