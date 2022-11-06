import { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ColumnData } from '../../shared/interfaces';

export const TasksList: FC<ColumnData> = (data) => {
  return (
    <>
      <ListGroup>
        {data.tasks.map((task) => (
          <ListGroup.Item key={task.id}>
            <h5>{task.title}</h5>
            <span>{task.description}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
