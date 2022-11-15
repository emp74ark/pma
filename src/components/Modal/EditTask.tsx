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
  const { id, title, order, description, userId, boardId, columnId } = data as Task;
  const { theme } = useSelector((state: RootState) => state.setting);
  const { users } = useSelector((state: RootState) => state);
  const colorText = theme === 'dark' ? 'white' : 'black';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Task>();

  const dispatch = useDispatch();
  function taskData(task: Task) {
    const newData = {
      id,
      order,
      userId: task.userId,
      boardId,
      columnId,
      title: task.title,
      description: task.description,
    };
    if (data?.id) {
      editTask(newData).then(() => {
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
          <div className="form-group">
            <label htmlFor="description">Assigned user</label>
            <select
              className="form-control"
              {...register('userId')}
              id="userId"
              defaultValue={userId}
            >
              {users.all.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.login}
                </option>
              ))}
            </select>
          </div>
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
