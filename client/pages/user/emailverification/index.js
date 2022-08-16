import EmailVerification from '../../../components/ReactHookAuthenticationForms/EmailVerification';
import { useRouter } from 'next/router';
import React from 'react';
import RenderOnNotAuthenticated from '../../../components/Authentication/AuthenticationRoutesHandler';
import { Container } from '@mui/material';
export default function emailverification() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div>
      <RenderOnNotAuthenticated>
        <EmailVerification />
      </RenderOnNotAuthenticated>
    </div>
  );
}
