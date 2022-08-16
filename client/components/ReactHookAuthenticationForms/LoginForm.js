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
import { Context } from '../../context';
import { Toast } from '../../utils/Toast';

export const LoginForm = () => {
  const router = useRouter();
  const { dispatch } = useContext(Context);
  const { showMessage } = useContext(Toast);

  // -----------Intial Values-----------
  const defaultValues = {
    email: '',
    password: '',
  };
  // ---------------Validation Schema (yup)-----------------------
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Format').required('Required'),
    password: yup.string().required('Password is required'),
  });
  // -------------------------------------------
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  // -------------onSubmit FXN---------------------------
  const onSubmit = async values => {
    try {
      const { data } = await axios.post('/expressapi/login', values);
      console.log('65:', data);
      dispatch({
        type: 'LOGIN',
        payload: data.user,
      });
      //Save In LocalStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      showMessage(data.message);
      router.push('/');
    } catch (error) {
      console.log('75:', error);
      showMessage(error.response?.data?.message, 'error');
    }
  };
  // ------------CSS Styles------------------------------------------

  const avatarStyle = {
    backgroundColor: '#86198f',
  };

  return (
    <React.Fragment>
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
              my: 4,
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
              Login
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

              <FormControl
                compType="input"
                name="password"
                type="password"
                label="Password"
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
            <Grid container>
              <Grid item xs={5} align="left">
                <Link href="../user/forgotpassword" underline="none">
                  <Typography variant="caption" display="block" gutterBottom>
                    Forgot your password ?
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={7} align="right">
                <Link href="../register" underline="none">
                  <Typography variant="caption" display="block" gutterBottom>
                    Don't have an account? Sign up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
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

export default LoginForm;
