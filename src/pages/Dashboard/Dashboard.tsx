import React, { FC, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../redux/modalSlice';

import { toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { getAllBoards } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state);

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    getAllBoards().then((response) => {
      setBoards(response.data);
      dispatch(toggleLoading(false));
    });
  }, [modal]);

  const removeHandler = (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'remove', data: board }));
  };

  const editHandler = (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editBoard', data: board }));
  };

  return (
    <Container fluid className="flex-fill overflow-auto">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">Dashboard</h2>
        <Button
          className="col-auto"
          variant="success"
          onClick={() => dispatch(openModal({ name: 'addBoard', data: null }))}
        >
          <i className="bi-plus-circle">
            <span className="m-2">Add board</span>
          </i>
        </Button>
      </div>
      <div className="row d-flex flex-wrap justify-content-center gap-3 flex-grow-1">
        {boards &&
          boards.map((board) => (
            <Card
              style={{ width: '20rem' }}
              className="col-2 p-0"
              key={board.id}
              onClick={() => openBoard(board.id!)}
            >
              <Card.Header>
                <div className="row">
                  <Card.Title className="col">{board.title}</Card.Title>
                  <ButtonGroup className="col float-right" size="sm">
                    <Button
                      className="bi-pencil text-success"
                      variant="link"
                      onClick={(e) => editHandler(e, board)}
                    />
                    <Button
                      className="bi-trash text-danger"
                      variant="link"
                      onClick={(e) => removeHandler(e, board)}
                    />
                  </ButtonGroup>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{board.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </Container>
  );
};
