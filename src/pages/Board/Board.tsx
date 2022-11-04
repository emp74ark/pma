import { FC } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TaskCard } from '../Task/Task';
import { fakeTasks } from '../Task/Task.props';
import { fakeColumns } from './Board.props';

export const Board: FC = () => {
  const params = useParams();

  return(
    <>
      <h2>Board {params.boardId}</h2>
      {fakeColumns.map((column) => (
        <Card key={column.id}>
          <Card.Header>{column.title}</Card.Header>
          <ListGroup>
              {fakeTasks.map((task) => (
                <ListGroup.Item key={task.id}>
                  {TaskCard(task)}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      ))}
    </>
  );
};
