import { FC } from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ColumnData } from '../../shared/interfaces';

export const TasksList: FC<ColumnData> = (data) => {
  return (
    <>
      <ListGroup>
        {data.tasks.map((task) => (
          <ListGroup.Item className="w-100" key={task.id}>
            <div className="row align-middle">
              <h6 className="col">{task.title}</h6>
              <ButtonGroup className="col float-right">
                <Button variant="secondary" size="sm">
                  <i className="bi-pencil"></i>
                </Button>
                <Button variant="secondary" size="sm">
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
