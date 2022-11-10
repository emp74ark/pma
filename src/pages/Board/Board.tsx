import { FC, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateButton from '../../components/CreateButton/CreateButton';

import DeleteButton from '../../components/DeleteButton/DeleteButton';
import EditButton from '../../components/EditButton/EditButton';
import { TasksList } from '../../components/Task/Task';
import { toggleLoading } from '../../redux/settingsSlice';
import { getBoardById } from '../../services/board.services';
import { getAllColums } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, Column, ColumnData } from '../../shared/interfaces';

export const BoardComonent: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boardId = params.boardId;
  const [boardData, setBoardData] = useState<Board>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnData, setColumnData] = useState<ColumnData[]>([]);

  useEffect(() => {
    dispatch(toggleLoading(true));
    getAllColums(boardId!).then((response) => {
      setColumns(response.data);
      response.data.map((column) => {
        getAllTasks(boardId!, column.id!).then((response) => {
          setColumnData([...columnData, { columnId: column.id!, tasks: response.data }]);
          dispatch(toggleLoading(false));
        });
      });
    });
    getBoardById(boardId!).then((response) => setBoardData(response.data));
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      <h2>{boardData?.title}</h2>
      <h3>{boardData?.description}</h3>
      <Button className="d-flex gap-3 align-self-start" variant="success" size="lg">
        <i className="bi-plus-circle" style={{ fontSize: '20px', color: 'white' }}></i>
        <span>Add column</span>
      </Button>
      <div className="w-100 h-100 d-flex gap-5 overflow-auto">
        {columns &&
          columns.map((column) => (
            <Card
              key={column.id}
              className="h-auto flex-grow-0 flex-shrink-0"
              style={{ width: '20rem' }}
            >
              <Card.Header className="d-flex gap-3">
                <span>{column.title}</span>
                <CreateButton className="ms-auto" onClick={() => console.log('click')} />
                <EditButton className="" onClick={() => console.log('click')} />
                <DeleteButton className="" onClick={() => console.log('click')} />
              </Card.Header>
              <Card.Body className="d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto">
                {columnData.map((column, i) => (
                  <div key={i}>{TasksList(column)}</div>
                ))}
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};
