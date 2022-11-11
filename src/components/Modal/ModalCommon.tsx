import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SpinnerComponent } from '../Spinner/Spinner';
import { AddBoard } from './AddBoard';
import { EditBoard } from './EditBoard';
import { ModalSession } from './ModalSession';
import { RemoveBoard } from './RemoveBoard';

export const ModalCommon: FC = () => {
  const { modal, setting } = useSelector((state: RootState) => state);
  return (
    <>
      {setting.loading && <SpinnerComponent />}
      <ModalSession />
      {modal.visible.addBoard && <AddBoard />}
      {modal.visible.editBoard && <EditBoard />}
      {modal.visible.remove && <RemoveBoard />}
    </>
  );
};
