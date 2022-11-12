import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteColumn } from '../../services/column.service';
import { Column } from '../../shared/interfaces';

export const RemoveColumn: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);

  const removeHandler = () => {
    if (data?.id)
      deleteColumn(data as Column).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Remove column</Modal.Title>
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
