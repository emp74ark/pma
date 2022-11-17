import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editColumn } from '../../services/column.service';
import { Board, Column } from '../../shared/interfaces';

export const EditColumn: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, title, order } = data as Column;
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Board>({ mode: 'all' });

  const dispatch = useDispatch();

  function columnData(column: Column) {
    const newData: Column = {
      ...data,
      title: column.title,
      order: order,
    };
    if (id) {
      editColumn(newData).then(() => {
        dispatch(resetModal());
      });
    }
  }

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
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
