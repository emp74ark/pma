import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { closeModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Task } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const InfoTask: FC = () => {
  const dispatch = useDispatch();
  const {
    modal: { data },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { title, description } = data as Task;
  const colorText = theme === 'dark' ? 'white' : 'black';
  const { t } = useTranslation();

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>{description}</Modal.Body>
      <Modal.Footer className={`bg-${theme}`}>
        <Button variant="warning" onClick={() => dispatch(closeModal('infoTask'))}>
          {t('infoTask.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
