import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { deleteColumn } from '../../services/column.service';
import { Column } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const RemoveColumn: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);
  const { theme } = useSelector((state: RootState) => state.setting);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const removeHandler = () => {
    if (data?.id)
      deleteColumn(data as Column).then(() => {
        dispatch(resetModal());
      });
  };

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('remove.removeColumn')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>{t('remove.sure')}</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="danger" onClick={() => removeHandler()}>
          {t('remove.yes')}
        </Button>
        <Button variant="warning" onClick={() => dispatch(closeModal('removeColumn'))}>
          {t('remove.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
