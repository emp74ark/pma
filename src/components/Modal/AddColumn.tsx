import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createColumn } from '../../services/column.service';
import { Column } from '../../shared/interfaces';

const AddColumn = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Column>();

  function columnData(column: Column) {
    createColumn(data?.id as string, column.title).then(() => {
      dispatch(resetModal());
    });
    reset();
  }

  return (
    <>
      <Modal className={`text-${colorText}`} size="lg" centered show={true}>
        <Modal.Header className={`bg-${theme}`}>
          <Modal.Title>Create new column</Modal.Title>
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
