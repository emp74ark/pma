import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { deleteUser, signout } from '../../services/user.service';
import { Column, Task, User } from '../../shared/interfaces';
import { deleteTask } from '../../services/task.service';
import { deleteColumn } from '../../services/column.service';
import { deleteBoard } from '../../services/board.services';
import { useNavigate } from 'react-router-dom';

export const RemoveModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    modal: { data },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';

  const removeHandler = () => {
    if (data?.hasOwnProperty('login'))
      deleteUser(data as User).then(() => {
        dispatch(resetModal());
        signout();
        navigate('/signin');
      });
    else if (data?.hasOwnProperty('columnId'))
      deleteTask(data as Task).then(() => {
        dispatch(resetModal());
      });
    else if (data?.hasOwnProperty('boardId'))
      deleteColumn(data as Column).then(() => {
        dispatch(resetModal());
      });
    else if (data?.id)
      deleteBoard(data?.id).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('remove.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>{t('remove.sure')}</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="danger" onClick={() => removeHandler()}>
          {t('remove.yes')}
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('remove'))}>
          {t('remove.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
