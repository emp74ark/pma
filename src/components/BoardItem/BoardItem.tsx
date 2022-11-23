import { FC, MouseEvent } from 'react';
import { Board } from '../../shared/interfaces';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { BoardButtons } from './ButtonItem.buttons';

const BoardItem: FC<Board> = (board) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    setting: { theme },
  } = useSelector((state: RootState) => state);

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  const buttonHandler = (e: MouseEvent, name: string, board: Board) => {
    e.stopPropagation();
    dispatch(openModal({ name: name, data: board }));
  };

  return (
    <Card
      style={{ width: '20rem' }}
      className="col-2 p-0 shadow"
      onClick={() => openBoard(board.id!)}
      bg={theme}
      text={theme === 'dark' ? 'white' : 'dark'}
    >
      <Card.Header>
        <div className="row">
          <Card.Title className="col">{board.title}</Card.Title>
          <ButtonGroup className="col float-right" size="sm">
            {BoardButtons.map(({ name, icon, color }) => (
              <Button
                key={name}
                className={`${icon} ${color}`}
                variant="link"
                onClick={(e) => buttonHandler(e, name, board)}
              />
            ))}
          </ButtonGroup>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{board.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BoardItem;
