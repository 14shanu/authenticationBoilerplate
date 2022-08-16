import React, { useContext, useEffect } from 'react';
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
import EmailIcon from '@mui/icons-material/Email';
import { Toast } from '../../utils/Toast';

export const ResetPassword = () => {
  const router = useRouter();
  const { showMessage } = useContext(Toast);

  const defaultValues = {
    email: router.query?.email,
    otp: '',
    password: '',
    confirm_password: '',
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Format').required('Required'),
    otp: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
    password: yup.string().required('Password is required'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async values => {
    console.log('values: ', values);
    try {
      const { data } = await axios.patch(`/expressapi/resetpassword`, values);
      showMessage(data.message);
      router.push('/login');
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };

  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue('email', router.query.email);
  }, [router.query]);

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
              <EmailIcon />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                compType="input"
                name="email"
                label="Email"
                control={control}
                margin="normal"
                disabled
                required
              />

              <FormControl
                compType="input"
                name="otp"
                label="OTP"
                control={control}
                margin="normal"
                required
              />
              <FormControl
                compType="input"
                name="password"
                label="Password"
                control={control}
                margin="normal"
                required
                type="password"
              />
              <FormControl
                compType="input"
                name="confirm_password"
                label="Confirm Password"
                control={control}
                margin="normal"
                required
                type="password"
              />

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
