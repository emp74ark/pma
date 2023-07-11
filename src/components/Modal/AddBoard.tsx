import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createBoard } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const AddBoard: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.setting);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Board>({ mode: 'all' });
  function boardData(board: Board) {
    createBoard(board).then(() => {
      dispatch(resetModal());
      navigate('/user/dashboard');
    });
    reset();
  }

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('addBoard.createBoard')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(boardData)}>
          <div className="form-group">
            <label htmlFor="title">{t('addBoard.boardName')}</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
            />
            {errors.title?.type === 'required' && (
              <Alert variant="warning">{t('addBoard.titleRequired')}</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">{t('addBoard.boardDescription')}</label>
            <input
              className="form-control"
              {...register('description', { required: true })}
              type="text"
              name="description"
              id="description"
            />
            {errors.description?.type === 'required' && (
              <Alert variant="warning">{t('addBoard.descriptionRequired')}</Alert>
            )}
          </div>
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            {t('addBoard.submit')}
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('addBoard'))}>
            {t('addBoard.cancel')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
