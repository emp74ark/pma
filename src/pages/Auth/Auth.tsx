import { FC } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mode } from '../../redux/authSlice';
import { RootState } from "../../redux/store";
import { AuthLogin } from "./Auth.login";
import { AuthRegister } from "./Auth.register";

export const Auth: FC = () => {
  const {mode: authMode} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return(
    <>
      <ButtonGroup>
        <Button variant={authMode === 'login' ? 'primary' : 'secondary'} onClick={() => dispatch(mode('login'))}>Login</Button>
        <Button variant={authMode === 'registration' ? 'primary' : 'secondary'} onClick={() => dispatch(mode('registration'))}>Registration</Button>
      </ButtonGroup>
      <div className="row">
        {authMode === 'login' && <AuthLogin />}
        {authMode === 'registration' && <AuthRegister />}
      </div>
    </>
  )
}