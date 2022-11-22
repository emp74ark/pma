import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal, resetModal } from '../../redux/modalSlice';

import { RootState } from '../../redux/store';
import { editUser, signout } from '../../services/user.service';
import { User } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const EditUser: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    users,
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ mode: 'all' });

  const formData = (data: Omit<User, 'id'>) => {
    const userData = {
      ...data,
      id: users.current?.id,
    };
    editUser(userData).then(() => {
      dispatch(resetModal());
      signout();
      navigate('/auth');
    });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('editUser.edit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(formData)}>
          <div className="form-group">
            <label htmlFor="name">{t('editUser.name')}</label>
            <input
              {...register('name', { required: true, minLength: 2 })}
              type="text"
              name="name"
              id="name"
              className="form-control"
              defaultValue={users.current?.name}
            />
            {errors.name?.type === 'required' && (
              <Alert variant="warning">{t('editUser.nameRequired')}</Alert>
            )}
            {errors.name?.type === 'minLength' && (
              <Alert variant="warning">{t('editUser.nameShort')}</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="login">{t('editUser.email')}</label>
            <input
              {...register('login', { required: true })}
              type="text"
              name="login"
              id="login"
              className="form-control"
              defaultValue={users.current?.login}
            />
            {errors.login?.type === 'required' && (
              <Alert variant="warning">{t('editUser.emailRequired')}</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('editUser.password')}</label>
            <input
              {...register('password', { required: true, minLength: 6 })}
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
            {errors.password?.type === 'required' && (
              <Alert variant="warning">{t('editUser.passwordRequired')}</Alert>
            )}
            {errors.password?.type === 'minLength' && (
              <Alert variant="warning">{t('editUser.passwordShort')}</Alert>
            )}
          </div>
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            {t('editUser.submit')}
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('editUser'))}>
            {t('editUser.cancel')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
