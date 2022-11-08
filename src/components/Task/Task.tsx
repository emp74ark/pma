import { FC } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { ColumnData } from '../../shared/interfaces';

export const TasksList: FC<ColumnData> = (data) => {
  return (
    <>
      <ListGroup>
        {data.tasks.map((task) => (
          <ListGroup.Item key={task.id}>
            <div className="d-flex align-items-center">
              <h5>{task.title}</h5>
              <Button className="ms-auto" variant="link" size="sm">
                <i className="bi-pencil" style={{ fontSize: '15px', color: 'blue' }}></i>
              </Button>
              <button type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <span>{task.description}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
