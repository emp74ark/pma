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
    <>
      <h2 className="mb-3 text-center">Login</h2>
      <form className="row justify-content-center" onSubmit={handleSubmit(formData)}>
        <div className="row mb-2 justify-content-center">
          <label
            className="col-md-5 d-flex flex-column justify-content-center"
            htmlFor="autoSizingInput"
          >
            Email
          </label>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <input
              {...register('login', { required: true })}
              type="text"
              name="login"
              id="autoSizingInput"
              className="form-control"
              placeholder="user@address.mail"
            />
            {errors.login?.type === 'required' && (
              <Alert variant="warning">Login is required</Alert>
            )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center">
          <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="password">
            Password
          </label>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5">
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
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5">
            <button
              type="submit"
              className="btn btn-success m-2 col-md-5"
              disabled={!isDirty || !isValid}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
