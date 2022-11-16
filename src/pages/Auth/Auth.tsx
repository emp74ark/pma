import { FC } from 'react';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { mode } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { AuthLogin } from './Auth.login';
import { AuthRegister } from './Auth.register';

export const Auth: FC = () => {
  const { mode: authMode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <Container className="flex-fill d-flex flex-column justify-content-center">
      <Row className="d-flex justify-content-center mb-auto">
        <ButtonGroup className="col-md-5 m-2">
          <Button
            className="w-50"
            variant={authMode === 'login' ? 'primary' : 'secondary'}
            onClick={() => dispatch(mode('login'))}
          >
            Login
          </Button>
          <Button
            className="w-50"
            variant={authMode === 'registration' ? 'primary' : 'secondary'}
            onClick={() => dispatch(mode('registration'))}
          >
            Registration
          </Button>
        </ButtonGroup>
      </Row>
      <Row className="d-flex justify-content-center mb-auto">
        {authMode === 'login' && <AuthLogin />}
        {authMode === 'registration' && <AuthRegister />}
      </Row>
    </Container>
  );
};
