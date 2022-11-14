import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createBoard } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const AddBoard: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Board>();
  function boardData(board: Board) {
    createBoard(board).then(() => {
      dispatch(resetModal());
    });
    reset();
  }

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Create new board</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(boardData)}>
          <div className="form-group">
            <label htmlFor="title">Board name</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
            />
            {errors.title?.type === 'required' && (
              <Alert variant="warning">Title is required</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Board description</label>
            <input
              className="form-control"
              {...register('description', { required: true })}
              type="text"
              name="description"
              id="description"
            />
            {errors.description?.type === 'required' && (
              <Alert variant="warning">Description is required</Alert>
            )}
          </div>
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            Submit
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('addBoard'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
