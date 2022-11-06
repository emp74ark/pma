import { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllBoards } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  useEffect(() => {
    getAllBoards().then((response) => setBoards(response.data));
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      {boards &&
        boards.map((board) => (
          <Card key={board.id} onClick={() => openBoard(board.id!)}>
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
              <Card.Text>{board.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
