import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';

export const RegisterError: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Registration error</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>This user already exist</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="warning" onClick={() => dispatch(closeModal('registerError'))}>
          Try again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
