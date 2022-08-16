import RegisterForm from '../../components/ReactHookAuthenticationForms/RegisterForm';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import RenderOnNotAuthenticated from '../../components/Authentication/AuthenticationRoutesHandler';
import { Container } from '@mui/material';
import { Context } from '../../context';
export default function Register() {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) router.push('/');
  }, [user]);

  return (
    <div>
      <RenderOnNotAuthenticated>
        <RegisterForm />
      </RenderOnNotAuthenticated>
    </div>
  );
}
