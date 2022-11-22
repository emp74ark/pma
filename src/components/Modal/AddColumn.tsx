import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createColumn } from '../../services/column.service';
import { Column } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

const AddColumn = () => {
  const dispatch = useDispatch();
  const {
    modal: { data },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Column>({ mode: 'all' });

  function columnData(column: Column) {
    createColumn(data?.id as string, column.title).then(() => {
      dispatch(resetModal());
    });
    reset();
  }

  return (
    <>
      <Modal className={`text-${colorText}`} size="lg" centered show={true}>
        <Modal.Header className={`bg-${theme}`}>
          <Modal.Title>{t('addColumn.createColumn')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`bg-${theme}`}>
          <form onSubmit={handleSubmit(columnData)}>
            <div className="form-group">
              <label htmlFor="title">{t('addColumn.columnName')}</label>
              <input
                className="form-control"
                {...register('title', { required: true })}
                type="text"
                name="title"
                id="title"
              />
              {errors.title?.type === 'required' && (
                <Alert variant="warning">{t('addColumn.titleRequired')}</Alert>
              )}
            </div>
            <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
              {t('addColumn.submit')}
            </Button>
            <Button variant="warning" onClick={() => dispatch(closeModal('addColumn'))}>
              {t('addColumn.cancel')}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddColumn;
