import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/authSlice';
import { User } from '../../shared/interfaces';

export const AuthLogin: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<User>({ mode: 'all' });

  function formData(form: User) {
    // TODO: error handling
    dispatch(logIn(form));
    reset();
    navigate('/user/dashboard');
  }

  return (
    <div className="col-4 m-2">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(formData)}>
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
          {errors.login?.type === 'required' && <Alert variant="warning">Login is required</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', { required: true })}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
          {errors.password?.type === 'required' && (
            <Alert variant="warning">Password is required</Alert>
          )}
        </div>
        <button type="submit" className="btn btn-success m-2" disabled={!isDirty || !isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
