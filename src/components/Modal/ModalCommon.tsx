import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SpinnerComponent } from '../Spinner/Spinner';
import { AddBoard } from './AddBoard';
import AddColumn from './AddColumn';
import { AddTask } from './AddTask';
import { AuthError } from './AuthError';
import { EditBoard } from './EditBoard';
import { EditTask } from './EditTask';
import { EditUser } from './EditUser';
import { ModalSession } from './ModalSession';
import { RegisterError } from './RegisterError';
import { InfoTask } from './InfoTask';
import { RemoveModal } from './RemoveModal';

export const ModalCommon: FC = () => {
  const { modal, setting } = useSelector((state: RootState) => state);

  return (
    <>
      {setting.loading && <SpinnerComponent />}
      <ModalSession />
      {modal.visible.addBoard && <AddBoard />}
      {modal.visible.editBoard && <EditBoard />}
      {modal.visible.addColumn && <AddColumn />}
      {modal.visible.addTask && <AddTask />}
      {modal.visible.editTask && <EditTask />}
      {modal.visible.authError && <AuthError />}
      {modal.visible.registerError && <RegisterError />}
      {modal.visible.editUser && <EditUser />}
      {modal.visible.infoTask && <InfoTask />}
      {modal.visible.remove && <RemoveModal />}
    </>
  );
};
