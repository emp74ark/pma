import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editBoard } from '../../services/board.services';
import { editColumn } from '../../services/column.service';
import { Board, Column } from '../../shared/interfaces';

export const EditColumn: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, title, order } = data as Column;
  const { boardId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Board>();

  const dispatch = useDispatch();

  function columnData(column: Column) {
    const newData = {
      title: column.title,
      order: order,
    };
    if (boardId && id) {
      editColumn(boardId, id, newData).then(() => {
        dispatch(resetModal());
      });
    }
  }

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(columnData)}>
          <div className="form-group">
            <label htmlFor="title">Column name</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
              defaultValue={title}
            />
          </div>
          {errors.title?.type === 'required' && <Alert variant="warning">Title is required</Alert>}
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            Submit
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('editColumn'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
