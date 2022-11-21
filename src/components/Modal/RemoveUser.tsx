import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteUser, signout } from '../../services/user.service';
import { User } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const RemoveUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.modal);
  const { theme } = useSelector((state: RootState) => state.setting);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const removeHandler = () => {
    deleteUser(data as User).then(() => {
      dispatch(resetModal());
      signout();
      navigate('/auth');
    });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('remove.removeUser')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>{t('remove.sure')}</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button
          variant="danger"
          onClick={() => {
            removeHandler();
          }}
        >
          {t('remove.yes')}
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeUser'))}>
          {t('remove.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
