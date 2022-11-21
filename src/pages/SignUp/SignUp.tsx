import { FC } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/authSlice';
import { openModal } from '../../redux/modalSlice';
import { signup } from '../../services/user.service';
import { User } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const SignUp: FC = () => {
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
    signup(form)
      .then((response) => {
        if (response.status === 201) {
          dispatch(signUp());
          reset();
          navigate('/signin');
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          dispatch(openModal({ name: 'registerError', data: null }));
        }
      });
  }

  return (
    <Container fluid className="flex-fill d-flex flex-column justify-content-center">
      <h2 className="mb-3 text-center mb-auto mt-5">{t('sign.signUp')}</h2>
      <form className="row justify-content-center mb-auto" onSubmit={handleSubmit(formData)}>
        <div className="form-group">
          <div className="row mb-2 justify-content-center">
            <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="name">
              {t('sign.name')}
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
                placeholder={t('sign.userName') as string}
              />
              {errors.name?.type === 'required' && (
                <Alert variant="warning">{t('sign.nameRequired')}</Alert>
              )}
              {errors.name?.type === 'minLength' && (
                <Alert variant="warning">{t('sign.nameShort')}</Alert>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row mb-2 justify-content-center">
            <label className="col-md-5 d-flex flex-column justify-content-center" htmlFor="login">
              {t('sign.email')}
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
                <Alert variant="warning">{t('sign.loginRequired')}</Alert>
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
              {t('sign.password')}
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
                <Alert variant="warning">{t('sign.passwordRequired')}</Alert>
              )}
              {errors.password?.type === 'minLength' && (
                <Alert variant="warning">{t('sign.passwordShort')}</Alert>
              )}
            </div>
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5">
            <button type="submit" className="btn btn-success m-2" disabled={!isDirty || !isValid}>
              {t('sign.submit')}
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
};
