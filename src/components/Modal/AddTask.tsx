import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createTask } from '../../services/task.service';
import { Task } from '../../shared/interfaces';

type DecodedToken = {
  iat: number;
  login: string;
  userId: string;
};

export const AddTask: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Task>();
  const token = localStorage.getItem('token') as string;
  const { decodedToken } = useJwt<DecodedToken>(token);
  function taskData(task: Task) {
    if (data && decodedToken?.userId) {
      const newData: Task = {
        ...data,
        ...task,
        userId: decodedToken?.userId,
      };
      console.log(newData);
      createTask(newData).then(() => {
        dispatch(resetModal());
      });
    }
    reset();
  }

  return (
    <Modal size="lg" centered show={true}>
      <Modal.Header>
        <Modal.Title>Create new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(taskData)}>
          <div className="form-group">
            <label htmlFor="title">Task name</label>
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
            <label htmlFor="description">Task description</label>
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
          <Button variant="warning" onClick={() => dispatch(closeModal('addTask'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
