import React, { FC } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { editColumn } from '../../services/column.service';
import { Board, Column } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const EditColumn: FC = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { id, title, order } = data as Column;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Board>({ mode: 'all' });

  const dispatch = useDispatch();

  function columnData(column: Column) {
    const newData: Column = {
      ...data,
      title: column.title,
      order: order,
    };
    if (id) {
      editColumn(newData).then(() => {
        dispatch(resetModal());
      });
    }
  }

  return (
    <div className="col">
      <form className="d-flex align-items-center gap-1" onSubmit={handleSubmit(columnData)}>
        <div className="form-group">
          <input
            className="form-control"
            {...register('title', { required: true })}
            type="text"
            name="title"
            id="title"
            defaultValue={title}
          />
        </div>
        {errors.title?.type === 'required' && (
          <Alert variant="warning">{t('editColumn.titleRequired')}</Alert>
        )}
        <Button
          size="sm"
          type="submit"
          variant="success"
          className="bi-check-lg text-light"
          disabled={!isValid}
        ></Button>
        <Button
          size="sm"
          variant="warning"
          className="bi-x-lg text-light"
          onClick={() => dispatch(closeModal('editColumn'))}
        ></Button>
      </form>
    </div>
  );
};
