import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useColumnsAllQuery } from '../../redux/columnsApi';
import { TasksList } from '../Task/Task';

interface ColumnData {
  boardId: string,
  columnId: string
}

export const Board: FC = () => {
  const params = useParams();
  const {data: columns, isFetching: columnsFetching} = useColumnsAllQuery(params.boardId!);

  return(
    <>
      <h2>Board {params.boardId}</h2>
      {columnsFetching && <h2>Loading</h2>}
      {columns && columns.map((column) => (
        <Card key={column.id}>
          <Card.Header>{column.title}{column.id}</Card.Header>
            <TasksList />
        </Card>
      ))}
    </>
  );
};
