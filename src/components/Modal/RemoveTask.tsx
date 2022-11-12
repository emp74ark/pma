import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteTask } from '../../services/task.service';
import { Task } from '../../shared/interfaces';

export const RemoveTask: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, columnId, boardId } = data as Task;

  const removeHandler = () => {
    if (boardId! && columnId && id) {
      deleteTask(boardId, columnId, id).then(() => {
        dispatch(resetModal());
      });
    }
  };

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Remove task</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you really want to do this?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            removeHandler();
          }}
        >
          Yes
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeTask'))}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
