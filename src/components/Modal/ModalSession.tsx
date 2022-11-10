import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

export const ModalSession: FC = () => {
  const navigate = useNavigate();
  const { exp, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(logOut());
    navigate('/auth');
  };

  return (
    <>
      <Modal show={exp && !!login} centered>
        <Modal.Header>
          <Modal.Title>Session life-time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your session token is expired</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-warning" onClick={() => buttonHandler()}>
            Understood
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
