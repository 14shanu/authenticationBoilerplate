import { ForgotPassword } from '../../../components/ReactHookAuthenticationForms/ForgotPassword';
import RenderOnNotAuthenticated from '../../../components/Authentication/AuthenticationRoutesHandler';

export default function forgotpassword() {
  return (
    <RenderOnNotAuthenticated>
      <ForgotPassword />
    </RenderOnNotAuthenticated>
  );
}
