import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

export const ModalSession: FC = () => {
  const navigate = useNavigate();
  const { exp, login } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(logOut());
    navigate('/auth');
  };

  return (
    <>
      <Modal className={`text-${colorText}`} show={exp && !!login} centered>
        <Modal.Header className={`bg-${theme}`}>
          <Modal.Title>Session life-time</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`bg-${theme}`}>
          <p>Your session token is expired</p>
        </Modal.Body>
        <Modal.Footer className={`bg-${theme}`}>
          <button className="btn btn-warning" onClick={() => buttonHandler()}>
            Understood
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
