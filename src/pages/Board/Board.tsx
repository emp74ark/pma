import { FC, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TasksList } from '../../components/Task/Task';
import { openModal } from '../../redux/modalSlice';
import { toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { getBoardById } from '../../services/board.services';
import { getAllColums } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, Column, ColumnData } from '../../shared/interfaces';

export const BoardComonent: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boardId = params.boardId;
  const [boardData, setBoardData] = useState<Board>();
  const [columnData, setColumnData] = useState<ColumnData[]>([]);
  const { theme } = useSelector((state: RootState) => state.setting);
  const { modal } = useSelector((state: RootState) => state);

  useEffect(() => {
    setColumnData([]);
    dispatch(toggleLoading(true));
    getAllColums(boardId!).then((reposnse) => {
      if (reposnse.status === 200) {
        dispatch(toggleLoading(false));
      }
      reposnse.data.map((column) => {
        getAllTasks(boardId!, column.id!).then((tasks) => {
          const data: ColumnData = {
            column,
            tasks: tasks.data,
          };
          setColumnData((prev) => [...prev, data]);
        });
      });
    });
    getBoardById(boardId!).then((response) => setBoardData(response.data));
  }, [modal]);

  const editColumnHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editColumn', data: { ...column, boardId: boardId! } }));
  };

  const removeColumnHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeColumn', data: { ...column, boardId: boardId! } }));
  };

  const addTaskHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(
      openModal({
        name: 'addTask',
        data: { boardId: boardId!, columnId: column.id, title: '' },
      })
    );
  };

  return (
    <Container fluid className="flex-fill">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">{boardData?.title}</h2>
        <Button
          className="col-auto"
          variant="success"
          onClick={() =>
            dispatch(openModal({ name: 'addColumn', data: { id: boardId, title: '' } }))
          }
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
        {columnData.map((data) => (
          <Card
            key={data.column.id}
            className="h-auto flex-grow-0 flex-shrink-0"
            style={{ width: '20rem' }}
            bg={theme}
            text={theme === 'dark' ? 'white' : 'dark'}
          >
            <Card.Header className="gap-3">
              <div className="row">
                <Card.Title className="col">{data.column.title}</Card.Title>
                <ButtonGroup className="col float-right" size="sm">
                  <Button
                    className="bi-plus-circle text-primary"
                    variant="link"
                    onClick={(e) => addTaskHandler(e, data.column)}
                  />
                  <Button
                    className="bi-pencil text-success"
                    variant="link"
                    onClick={(e) => editColumnHandler(e, data.column)}
                  />
                  <Button
                    className="bi-trash text-danger"
                    variant="link"
                    onClick={(e) => removeColumnHandler(e, data.column)}
                  />
                </ButtonGroup>
              </div>
            </Card.Header>
            <Card.Body className="d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto">
              {<TasksList data={data} />}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};
