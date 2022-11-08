import { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
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
    <>
      <h2>{boardData?.title}</h2>
      <h3>{boardData?.description}</h3>
      <div className="w-100 h-100 d-flex gap-5">
        {columns &&
          columns.map((column) => (
            <Card key={column.id} style={{ width: '300px', height: 'auto', flex: '0 0 300px' }}>
              <Card.Header className="d-flex gap-3">
                <span>{column.title}</span>
                <CreateButton className="ms-auto" onClick={() => console.log('click')} />
                <EditButton className="" onClick={() => console.log('click')} />
                <DeleteButton className="" onClick={() => console.log('click')} />
              </Card.Header>
              <Card.Body
                className="d-flex flex-column gap-3 overflow-auto"
                style={{ width: '250px', height: '600px', flex: '0 0 600px' }}
              >
                {columnData.map((column) => TasksList(column))}
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};
