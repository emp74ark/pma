import { FC } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/authSlice';
import { openModal } from '../../redux/modalSlice';
import { toggleLoading } from '../../redux/settingsSlice';
import { saveToken } from '../../services/interceptor.service';
import { signin } from '../../services/user.service';
import { User } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const SignIn: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<User>({ mode: 'all' });

  function formData(form: User) {
    dispatch(toggleLoading(true));
    signin(form)
      .then((response) => saveToken(response))
      .then((result) => {
        if (result) {
          dispatch(toggleLoading(false));
          dispatch(logIn(form));
          reset();
          navigate('/user/dashboard');
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          dispatch(toggleLoading(false));
          dispatch(openModal({ name: 'authError', data: null }));
        }
      });
  }

  return (
    <Container fluid className="flex-fill d-flex flex-column justify-content-center">
      <h2 className="mb-3 text-center mb-auto mt-5">{t('sign.signIn')}</h2>
      <form className="row justify-content-center mb-auto" onSubmit={handleSubmit(formData)}>
        <div className="row mb-2 justify-content-center">
          <label
            className="col-md-5 d-flex flex-column justify-content-center"
            htmlFor="autoSizingInput"
          >
            {t('sign.email')}
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
              <Alert variant="warning">{t('sign.loginRequired')}</Alert>
            )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center">
          <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="password">
            {t('sign.password')}
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
              <Alert variant="warning">{t('sign.passwordRequired')}</Alert>
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
              {t('sign.submit')}
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
};
