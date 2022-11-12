import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteColumn } from '../../services/column.service';
import { deleteTask } from '../../services/task.service';

export const RemoveTask: FC = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const { modal } = useSelector((state: RootState) => state);
  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Remove task</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you really want to do this?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => {}}>
          Yes
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeTask'))}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
