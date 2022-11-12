import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { SpinnerComponent } from '../Spinner/Spinner';
import AddColumn from './AddColumn';
import { EditColumn } from './EditColumn';
import { ModalSession } from './ModalSession';

export const ModalColumn: FC = () => {
  const { modal, setting } = useSelector((state: RootState) => state);
  return (
    <>
      {setting.loading && <SpinnerComponent />}
      <ModalSession />
      {modal.visible.addColumn && <AddColumn />}
      {modal.visible.editColumn && <EditColumn />}
    </>
  );
};
