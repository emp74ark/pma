import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useBoardsAllQuery } from '../../redux/boardsApi';

export const Dashboard: FC = () => {
  const navigate = useNavigate()
  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`)
  }

  const {data: boards, isFetching: boardsFetching} = useBoardsAllQuery();

  return(
    <>
      <h2>Dashboard</h2>
      {boardsFetching && <h3>Loading</h3>}
      {boards && boards.map((board) => (
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
