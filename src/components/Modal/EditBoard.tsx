import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';

export const EditBoard: FC = () => {
  const dispatch = useDispatch();
  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="success" className="m-2">
          Save
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('editBoard'))}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
