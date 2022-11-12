import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteBoard } from '../../services/board.services';
import { deleteColumn } from '../../services/column.service';

export const RemoveColumn: FC = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const { modal } = useSelector((state: RootState) => state);

  const removeHandler = () => {
    if (modal.data?.id)
      deleteColumn(boardId!, modal.data.id).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Remove board</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you really want to do this?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => removeHandler()}>
          Yes
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeColumn'))}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
