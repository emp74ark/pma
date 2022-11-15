import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';

export const AuthError: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Authorization error</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>Login or password is wrong</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="warning" onClick={() => dispatch(closeModal('authError'))}>
          Try again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
