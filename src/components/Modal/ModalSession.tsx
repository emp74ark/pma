import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

export const ModalSession: FC = () => {
  const navigate = useNavigate();
  const { exp, login } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const buttonHandler = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <Modal className={`text-${colorText}`} show={exp && !!login} centered>
        <Modal.Header className={`bg-${theme}`}>
          <Modal.Title>{t('modalSession.session')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`bg-${theme}`}>
          <p>{t('modalSession.tokenExpired')}</p>
        </Modal.Body>
        <Modal.Footer className={`bg-${theme}`}>
          <button className="btn btn-warning" onClick={() => buttonHandler()}>
            {t('modalSession.understood')}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
