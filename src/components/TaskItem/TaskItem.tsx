import React, { FC } from 'react';
import { Task } from '../../shared/interfaces';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const TaskItem: FC<Task> = (task) => {
  const dispatch = useDispatch();
  const {
    users,
    setting: { theme },
  } = useSelector((state: RootState) => state);

  const editHandler = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editTask', data: task }));
  };
  const deleteHandler = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeTask', data: task }));
  };

  function defineName(userId: string) {
    const user = users.all.filter((user) => user.id === userId);
    if (user.length !== 0) {
      return user[0].login;
    }
    return 'unknown';
  }

  return (
    <ListGroup.Item variant={theme} className="w-100">
      <div className="row align-middle">
        <h6 className="col">{task.title}</h6>
        <ButtonGroup className="col float-right">
          <Button onClick={(e) => editHandler(e, task)} variant="secondary" size="sm">
            <i className="bi-pencil"></i>
          </Button>
          <Button onClick={(e) => deleteHandler(e, task)} variant="secondary" size="sm">
            <i className="bi-trash"></i>
          </Button>
        </ButtonGroup>
      </div>
      <div className="row p-2">{task.description}</div>
      <div className="row p-2">{defineName(task.userId)}</div>
    </ListGroup.Item>
  );
};
