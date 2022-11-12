import { FC, useEffect } from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { openModal } from '../../redux/modalSlice';
import { ColumnData, Task } from '../../shared/interfaces';

export const TasksList = (props: { data: ColumnData }) => {
  const dispatch = useDispatch();
  const { data } = props;
  const editHandler = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editTask', data: task }));
  };
  const deleteHandler = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeTask', data: task }));
  };

  return (
    <>
      <ListGroup>
        {data.tasks.map((task) => (
          <ListGroup.Item className="w-100" key={task.id}>
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
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
