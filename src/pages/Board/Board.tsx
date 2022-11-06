import { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TasksList } from '../../components/Task/Task';
import { getBoardById } from '../../services/board.services';
import { getAllColums } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, Column, ColumnData } from '../../shared/interfaces';

export const BoardComonent: FC = () => {
  const params = useParams();
  const boardId = params.boardId;
  const [boardData, setBoardData] = useState<Board>()
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnData, setColumnData] = useState<ColumnData[]>([])

  useEffect(() => {
    getAllColums(boardId!)
      .then(
        response => {
          setColumns(response.data);
          response.data.map(column => {
            getAllTasks(boardId!, column.id!)
              .then(response => setColumnData([...columnData, {columnId: column.id!, tasks: response.data}]))
          })
        });
    getBoardById(boardId!).then(response => setBoardData(response.data))
  }, []);

  return(
    <>
      <h2>{boardData?.title}</h2>
      <h3>{boardData?.description}</h3>
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
