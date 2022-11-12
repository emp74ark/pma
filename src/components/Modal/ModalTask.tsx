import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { SpinnerComponent } from '../Spinner/Spinner';
import { AddTask } from './AddTask';
import { EditTask } from './EditTask';
import { ModalSession } from './ModalSession';

export const ModalTask: FC = () => {
  const { modal, setting } = useSelector((state: RootState) => state);
  return (
    <>
      {setting.loading && <SpinnerComponent />}
      <ModalSession />
      {modal.visible.addTask && <AddTask />}
      {modal.visible.editTask && <EditTask />}
    </>
  );
};
