import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editBoard } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const EditBoard: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, title, description } = data as Board;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Board>();

  const dispatch = useDispatch();

  function boardData(board: Board) {
    const newData = {
      id: id,
      title: board.title,
      description: board.description,
    };
    editBoard(newData).then(() => {
      dispatch(resetModal());
    });
  }

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(boardData)}>
          <div className="form-group">
            <label htmlFor="title">Board name</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
              defaultValue={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Board description</label>
            <input
              className="form-control"
              {...register('description', { required: true })}
              type="text"
              name="description"
              id="description"
              defaultValue={description}
            />
          </div>
          {errors.title?.type === 'required' && <Alert variant="warning">Title is required</Alert>}
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            Submit
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('editBoard'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
