import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteBoard } from '../../services/board.services';

export const RemoveBoard: FC = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const removeHandler = () => {
    if (modal.data?.id)
      deleteBoard(modal.data.id).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Remove board</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>Do you really want to do this?</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="danger" onClick={() => removeHandler()}>
          Yes
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeBoard'))}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
