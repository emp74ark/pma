import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/authSlice';
import { openModal } from '../../redux/modalSlice';
import { signup } from '../../services/user.service';
import { User } from '../../shared/interfaces';

export const AuthRegister: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<User>({ mode: 'all' });

  function formData(form: User) {
    signup(form)
      .then((response) => {
        if (response.status === 201) {
          dispatch(signUp());
          reset();
          navigate('/auth');
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          dispatch(openModal({ name: 'registerError', data: null }));
        }
      });
  }

  return (
    <>
      <h2 className="mb-3 text-center">Registration</h2>
      <form className="row justify-content-center" onSubmit={handleSubmit(formData)}>
        <div className="form-group">
          <div className="row mb-2 justify-content-center">
            <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="name">
              Name
            </label>
          </div>
          <div className="row mb-3 justify-content-center">
            <div className="col-md-5 d-flex flex-column justify-content-center">
              <input
                {...register('name', { required: true, minLength: 2 })}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="User name"
              />
              {errors.name?.type === 'required' && (
                <Alert variant="warning">Name is required</Alert>
              )}
              {errors.name?.type === 'minLength' && (
                <Alert variant="warning">Name is too short</Alert>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row mb-2 justify-content-center">
            <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="login">
              Email
            </label>
          </div>
          <div className="row mb-3 justify-content-center">
            <div className="col-md-5 d-flex flex-column justify-content-center">
              <input
                {...register('login', { required: true })}
                type="text"
                name="login"
                id="login"
                className="form-control"
                placeholder="user@address.mail"
              />
              {errors.login?.type === 'required' && (
                <Alert variant="warning">Name is required</Alert>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row mb-2 justify-content-center">
            <label
              className="col-md-5 d-flex flex-column justify-content-center"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="row mb-3 justify-content-center">
            <div className="col-md-5">
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
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5">
            <button type="submit" className="btn btn-success m-2" disabled={!isDirty || !isValid}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
