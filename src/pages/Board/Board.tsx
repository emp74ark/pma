import { FC } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useColumnsAllQuery } from '../../redux/columnsApi';
import { TaskCard } from '../Task/Task';
import { fakeTasks } from '../Task/Task.props';

export const Board: FC = () => {
  const params = useParams();
  const {data: columns, isFetching: columnsFetching} = useColumnsAllQuery(params.boardId!);

  return(
    <>
      <h2>Board {params.boardId}</h2>
      {columnsFetching && <h2>Loading</h2>}
      {columns && columns.map((column) => (
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
