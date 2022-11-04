import { FC, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { AuthLogin } from "./Auth.login";
import { AuthRegister } from "./Auth.register";

export const Auth: FC = () => {
  const [authMode, setAuthMode] = useState('login');

  return(
    <>
      <ButtonGroup>
        <Button variant={authMode === 'login' ? 'primary' : 'secondary'} onClick={() => setAuthMode('login')}>Login</Button>
        <Button variant={authMode === 'registration' ? 'primary' : 'secondary'} onClick={() => setAuthMode('registration')}>Registration</Button>
      </ButtonGroup>
      <div className="row">
        {authMode === 'login' && <AuthLogin />}
        {authMode === 'registration' && <AuthRegister />}
      </div>
    </>
  )
}