import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editTask } from '../../services/task.service';
import { Task } from '../../shared/interfaces';

export const EditTask: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, title, description, order, userId, columnId, boardId } = data as Task;
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Task>();

  const dispatch = useDispatch();
  function taskData(task: Task) {
    const newData = {
      title: task.title,
      order,
      userId,
      description: task.description,
      columnId,
      boardId,
      id,
    };
    if (boardId && columnId) {
      editTask(boardId, columnId, newData, userId).then(() => {
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
        <form onSubmit={handleSubmit(taskData)}>
          <div className="form-group">
            <label htmlFor="title">Task name</label>
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
            <label htmlFor="description">Task description</label>
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
          <Button variant="warning" onClick={() => dispatch(closeModal('editTask'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
