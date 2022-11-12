import { FC, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TasksList } from '../../components/Task/Task';
import { openModal } from '../../redux/modalSlice';
import { toggleLoading } from '../../redux/settingsSlice';
import { getBoardById } from '../../services/board.services';
import { getAllColums } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, Column, ColumnData, Task } from '../../shared/interfaces';

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

  const editHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editColumn', data: column }));
  };

  const removeHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeColumn', data: column }));
  };

  const addTaskHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'addTask', data: column }));
  };

  return (
    <Container fluid className="flex-fill">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">{boardData?.title}</h2>
        <Button
          className="col-auto"
          variant="success"
          onClick={() => dispatch(openModal({ name: 'addColumn', data: null }))}
        >
          <i className="bi-plus-circle">
            <span className="m-2">Add column</span>
          </i>
        </Button>
      </div>
      <div className="row m-3">
        <h3 className="col text-center text-secondary">{boardData?.description}</h3>
      </div>
      <div className="w-100 min-vh-80 d-flex gap-5 overflow-auto">
        {columns &&
          columns.map((column) => (
            <Card
              key={column.id}
              className="h-auto flex-grow-0 flex-shrink-0"
              style={{ width: '20rem' }}
            >
              <Card.Header className="gap-3">
                <div className="row">
                  <Card.Title className="col">{column.title}</Card.Title>
                  <ButtonGroup className="col float-right" size="sm">
                    <Button
                      className="bi-plus-circle text-primary"
                      variant="link"
                      onClick={(e) => addTaskHandler(e, column)}
                    />
                    <Button
                      className="bi-pencil text-success"
                      variant="link"
                      onClick={(e) => editHandler(e, column)}
                    />
                    <Button
                      className="bi-trash text-danger"
                      variant="link"
                      onClick={(e) => removeHandler(e, column)}
                    />
                  </ButtonGroup>
                </div>
              </Card.Header>
              <Card.Body className="d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto">
                {columnData.map((column, i) => (
                  <div key={i}>{<TasksList data={column} />}</div>
                ))}
              </Card.Body>
            </Card>
          ))}
      </div>
    </Container>
  );
};
