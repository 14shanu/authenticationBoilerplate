import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Toast } from '../../utils/Toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormControl } from '../formComponents/FormControl';

function EmailVerificationForm() {
  // const [email, setEmail] = useState('');
  const router = useRouter();
  const { showMessage } = useContext(Toast);

  const defaultValues = {
    email: router.query?.email,
    otp: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required('email is Required'),
    otp: yup.number('password is required').required('password is required'),
  });

  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue('email', router.query.email);
  }, [router.query]);

  const onSubmit = async values => {
    console.log('values: ', values);
    try {
      const { data } = await axios.post('/expressapi/verifyemail', values);
      showMessage(data.message);
      router.push('/login');
    } catch (error) {
      showMessage(error.response?.data?.message, 'error');
    }
  };

  const resendOtpHandler = async () => {
    const values = getValues();

    try {
      const { data } = await axios.post('/expressapi/resendotp', values);
      showMessage(data.message);
    } catch (error) {
      console.log('error: ', error);
      showMessage(error.response?.data?.message, 'error');
    }
  };

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 350,
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
            <EmailIcon />
          </Avatar>
          <Typography variant="h5">Email Verification</Typography>
        </Grid>

        <Grid align="center" style={LogoStyle}>
          <img
            src="https://veneratesolutions.com/wp-content/uploads/2021/03/Venerate-Medium-768x208.png"
            width="140"
          />
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            compType="input"
            name="email"
            label="Email"
            control={control}
            variant="outlined"
          />

          <FormControl
            compType={`input`}
            name="otp"
            label="Otp"
            control={control}
            variant="outlined"
          />

          <Button variant="contained" type="button" onClick={resendOtpHandler}>
            Resend Otp?
          </Button>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default EmailVerificationForm;
