import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/authSlice';
import { User } from '../../shared/interfaces';

export const AuthRegister: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<User>({ mode: 'all' });

  function formData(form: User) { // TODO: error handling
    dispatch(signUp(form));
    reset();
    navigate('/auth');
  }

  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(formData)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            {...register('name', {required: true, minLength: 2})}
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder='User name'
          />
          {errors.name?.type === 'required' && <Alert variant='warning'>Name is required</Alert>}
          {errors.name?.type === 'minLength' && <Alert variant='warning'>Name is too short</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="login">Email</label>
          <input 
            {...register('login', {required: true})}
            type="text"
            name="login"
            id="login"
            className="form-control"
            placeholder='user@address.mail'
          />
          {errors.login?.type === 'required' && <Alert variant='warning'>Name is required</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {required: true, minLength: 6})}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
          {errors.password?.type === 'required' && <Alert variant='warning'>Password is required</Alert>}
          {errors.password?.type === 'minLength' && <Alert variant='warning'>Password is too short</Alert>}
        </div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={!isDirty || !isValid}
        >
          Submit
        </button>
      </form>
    </>
  );
};
