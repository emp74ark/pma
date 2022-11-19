import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { User } from '../../shared/interfaces';

export const UserProfile: FC = () => {
  const { users } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const editUserHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editUser', data: null }));
  };

  const removeUserHandler = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeUser', data: user }));
  };

  return (
    <Container className="flex-fill d-flex flex-column gap-2 justify-content-center align-items-center">
      <h1>User Profile</h1>
      <h5>Your Name: </h5>
      <h3>{users.current?.name}</h3>
      <h5>Email: </h5>
      <h3>{users.current?.login}</h3>
      <div className="d-flex flex-column gap-2 align-self-center">
        <button className="btn btn-primary" onClick={editUserHandler}>
          Edit
        </button>
        <button
          onClick={(e) => removeUserHandler(e, users?.current as User)}
          className="btn btn-danger"
        >
          Delete User
        </button>
      </div>
    </Container>
  );
};
