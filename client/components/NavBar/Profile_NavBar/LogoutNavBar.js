// ******************** Logout ***********************8
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useReducer, createContext, useEffect } from 'react';
import { Context } from '../../../context';

function LogoutNavBar() {
  const router = useRouter();

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const LogoutHandler = async () => {
    try {
      console.log('logout');
      const { data } = await axios.get(`/expressapi/logout`);
      dispatch({
        type: 'LOGOUT',
      });
      localStorage.removeItem('user');

      // localStorage.removeItem('token')
      router.push('/login');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <MenuItem onClick={LogoutHandler}>
        <LogoutRoundedIcon />
        Logout
      </MenuItem>
    </div>
  );
}

export default LogoutNavBar;
