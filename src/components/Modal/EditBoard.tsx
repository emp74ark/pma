import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editBoard } from '../../services/board.services';
import { Board } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const EditBoard: FC = () => {
  const {
    modal: { data },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { id, title, description } = data as Board;
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Board>({ mode: 'all' });
  const dispatch = useDispatch();

  function boardData(board: Board) {
    const newData = {
      id: id,
      title: board.title,
      description: board.description,
    };
    editBoard(newData).then(() => {
      dispatch(resetModal());
    });
  }

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('editBoard.edit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(boardData)}>
          <div className="form-group">
            <label htmlFor="title">{t('editBoard.boardName')}</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
              defaultValue={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">{t('editBoard.boardDescription')}</label>
            <input
              className="form-control"
              {...register('description', { required: true })}
              type="text"
              name="description"
              id="description"
              defaultValue={description}
            />
          </div>
          {errors.title?.type === 'required' && (
            <Alert variant="warning">{t('editBoard.titleRequired')}</Alert>
          )}
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            {t('editBoard.submit')}
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('editBoard'))}>
            {t('editBoard.cancel')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
