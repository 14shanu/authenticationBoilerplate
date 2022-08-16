import React from 'react';
import RenderOnNotAuthenticated from '../../../components/Authentication/AuthenticationRoutesHandler';
import { ResetPassword } from '../../../components/ReactHookAuthenticationForms/ResetPassword';

export default function resetpassword() {
  return (
    <RenderOnNotAuthenticated>
      <ResetPassword />
    </RenderOnNotAuthenticated>
  );
}
