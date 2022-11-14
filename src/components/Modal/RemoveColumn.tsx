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
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const removeHandler = () => {
    if (data?.id)
      deleteColumn(data as Column).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Remove column</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>Do you really want to do this?</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
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
