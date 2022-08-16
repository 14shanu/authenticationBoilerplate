import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormControl } from '../formComponents/FormControl';
import useSWR from 'swr';
import { Spinner } from '../../utils/Spinner';
import axios from 'axios';
import { Toast } from '../../utils/Toast';

export const Dashboard = () => {
  return (
    <React.Fragment>
      <Typography className="m-4" color="#0C4A6E" variant="h5">
        Dashboard
      </Typography>
    </React.Fragment>
  );
};
