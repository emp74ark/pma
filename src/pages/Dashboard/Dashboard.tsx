import { FC, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toggleLoading } from '../../redux/settingsSlice';
import { getAllBoards } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const dispatch = useDispatch();

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    getAllBoards().then((response) => {
      setBoards(response.data);
      dispatch(toggleLoading(false));
    });
  }, []);

  return (
    <Container fluid className="flex-fill overflow-auto">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">Dashboard</h2>
        <Button className="col-auto" variant="success">
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
                      onClick={() => console.log('click')}
                    />
                    <Button
                      className="bi-trash text-danger"
                      variant="link"
                      onClick={() => console.log('click')}
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
