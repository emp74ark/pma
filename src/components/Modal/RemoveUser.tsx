import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteUser, signout } from '../../services/user.service';
import { User } from '../../shared/interfaces';

export const RemoveUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.modal);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const removeHandler = () => {
    deleteUser(data as User).then(() => {
      dispatch(resetModal());
      signout();
      navigate('/auth');
    });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Remove user</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>Do you really want to do this?</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button
          variant="danger"
          onClick={() => {
            removeHandler();
          }}
        >
          Yes
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeUser'))}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
