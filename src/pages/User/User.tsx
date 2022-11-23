import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { User } from '../../shared/interfaces';
import { useTranslation } from 'react-i18next';

export const UserProfile: FC = () => {
  const { users } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const editUserHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editUser', data: null }));
  };

  const removeUserHandler = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'remove', data: user }));
  };

  return (
    <Container className="flex-fill d-flex flex-column gap-2 justify-content-center align-items-center">
      <h1>{t('user.title')}</h1>
      <h5>{t('user.nameInput')}</h5>
      <h3>{users.current?.name}</h3>
      <h5>{t('user.emailInput')}</h5>
      <h3>{users.current?.login}</h3>
      <div className="d-flex flex-column gap-2 align-self-center">
        <button className="btn btn-primary" onClick={editUserHandler}>
          {t('user.edit')}
        </button>
        <button
          onClick={(e) => removeUserHandler(e, users?.current as User)}
          className="btn btn-danger"
        >
          {t('user.delete')}
        </button>
      </div>
    </Container>
  );
};
