import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { Column } from '../../shared/interfaces';

const AddColumn = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Column>();

  return (
    <>
      <Modal size="lg" centered show={true}>
        <Modal.Header>
          <Modal.Title>Create new column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={() => {}}>
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
