import React, { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { allUsers, currentUser } from '../../redux/usersSlice';
import { getAllBoards } from '../../services/board.services';
import { getAllUsers } from '../../services/user.service';
import { Board } from '../../shared/interfaces';
import { BoardItem } from '../../components/BoardItem/BoardItem';
import { useTranslation } from 'react-i18next';
import { ItemActions } from '../../components/ItemActions/ItemAction';

export const Dashboard: FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const dispatch = useDispatch();
  const {
    modal,
    auth: { login },
  } = useSelector((state: RootState) => state);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(toggleLoading(true));
    getAllBoards().then((response) => {
      if (response.status === 200) {
        dispatch(toggleLoading(false));
      }
      setBoards(response.data);
    });
    getAllUsers().then((response) => {
      dispatch(allUsers(response.data));
      const current = response.data.find((user) => user.login === login);
      if (current) dispatch(currentUser(current));
    });
  }, [modal]);

  return (
    <Container fluid className="flex-fill overflow-auto">
      <ItemActions item="board" />
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">{t('dashboard.title')}</h2>
      </div>
      <div className="row d-flex flex-wrap justify-content-center gap-3 flex-grow-1">
        {boards && boards.map((board) => <BoardItem key={board.id} {...board} />)}
      </div>
    </Container>
  );
};
