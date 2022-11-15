import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';

import { RootState } from '../../redux/store';
import { User } from '../../shared/interfaces';

export const EditUser: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<User>({ mode: 'all' });

  const dispatch = useDispatch();

  const formData = (data: User) => {
    console.log('from data: ', data, errors);
    reset();
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(formData)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', { required: true, minLength: 2 })}
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="User name"
            />
            {errors.name?.type === 'required' && <Alert variant="warning">Name is required</Alert>}
            {errors.name?.type === 'minLength' && (
              <Alert variant="warning">Name is too short</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="login">Email</label>
            <input
              {...register('login', { required: true })}
              type="text"
              name="login"
              id="login"
              className="form-control"
              placeholder="user@address.mail"
            />
            {errors.login?.type === 'required' && <Alert variant="warning">Name is required</Alert>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              {...register('password', { required: true, minLength: 6 })}
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
            {errors.password?.type === 'required' && (
              <Alert variant="warning">Password is required</Alert>
            )}
            {errors.password?.type === 'minLength' && (
              <Alert variant="warning">Password is too short</Alert>
            )}
          </div>
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            Submit
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('editUser'))}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
