import React, { FC } from 'react';
import { Board } from '../../shared/interfaces';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export const BoardItem: FC<Board> = (board) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    setting: { theme },
  } = useSelector((state: RootState) => state);

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  const removeHandler = (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'remove', data: board }));
  };

  const editHandler = (e: React.MouseEvent, board: Board) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editBoard', data: board }));
  };

  return (
    <Card
      style={{ width: '20rem' }}
      className="col-2 p-0"
      onClick={() => openBoard(board.id!)}
      bg={theme}
      text={theme === 'dark' ? 'white' : 'dark'}
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
  );
};
