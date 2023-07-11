import { FC } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, resetModal } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import { createTask } from '../../services/task.service';
import { Task } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const AddTask: FC = () => {
  const dispatch = useDispatch();
  const {
    users,
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
  } = useForm<Task>({ mode: 'all' });

  function taskData(task: Task) {
    if (data) {
      const newData: Task = {
        ...data,
        ...task,
      };
      createTask(newData).then(() => {
        dispatch(resetModal());
      });
    }
    reset();
  }

  return (
    <Modal className={`text-${colorText}`} size="lg" centered show={true}>
      <Modal.Header className={`bg-${theme}`}>
        <Modal.Title>{t('addTask.createTask')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${theme}`}>
        <form onSubmit={handleSubmit(taskData)}>
          <div className="form-group">
            <label htmlFor="title">{t('addTask.taskName')}</label>
            <input
              className="form-control"
              {...register('title', { required: true })}
              type="text"
              name="title"
              id="title"
            />
            {errors.title?.type === 'required' && (
              <Alert variant="warning">{t('addTask.titleRequired')}</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">{t('addTask.taskDescription')}</label>
            <input
              className="form-control"
              {...register('description', { required: true })}
              type="text"
              name="description"
              id="description"
            />
            {errors.description?.type === 'required' && (
              <Alert variant="warning">{t('addTask.descriptionRequired')}</Alert>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">{t('addTask.assignedUser')}</label>
            <select
              className="form-control"
              {...register('userId')}
              id="userId"
              defaultValue={users.current?.id}
            >
              {users.all.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.login}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="success" className="m-2" disabled={!isValid}>
            {t('addTask.submit')}
          </Button>
          <Button variant="warning" onClick={() => dispatch(closeModal('addTask'))}>
            {t('addTask.cancel')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
