import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { createColumn } from '../../services/column.service';
import { Column } from '../../shared/interfaces';

const AddColumn = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Column>();

  function columnData(column: Column) {
    createColumn(boardId as string, column.title).then(() => {
      dispatch(resetModal());
    });
    reset();
  }

  return (
    <>
      <Modal size="lg" centered show={true}>
        <Modal.Header>
          <Modal.Title>Create new column</Modal.Title>
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
              />
              {errors.title?.type === 'required' && (
                <Alert variant="warning">Title is required</Alert>
              )}
            </div>
            <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
              Submit
            </Button>
            <Button variant="warning" onClick={() => dispatch(closeModal('addColumn'))}>
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddColumn;
