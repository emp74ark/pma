import { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getAllColums } from '../../services/column.service';
import { Column, Task } from '../../shared/interfaces';
import { TasksList } from '../../components/Task/Task';
import { getAllTasks } from '../../services/task.service';

export interface ColumnData {
  columnId: string,
  tasks: Task[],
}

export const Board: FC = () => {
  const params = useParams();
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnData, setColumnData] = useState<ColumnData[]>([])

  useEffect(() => {
    getAllColums(params.boardId!)
      .then(
        response => {
          setColumns(response.data);
          response.data.map(column => {
            getAllTasks(params.boardId!, column.id!)
              .then(response => setColumnData([...columnData, {columnId: column.id!, tasks: response.data}]))
          })
        });

    setTimeout(() => {console.log(columnData)}, 3000)
  }, []);

  return(
    <>
      <h2>Board</h2>
      {columns && columns.map((column) => (
        <Card key={column.id}>
          <Card.Header>{column.title}</Card.Header>
            {columnData.map(column => (
              TasksList(column)
            ))}
        </Card>
      ))}
    </>
  );
};
