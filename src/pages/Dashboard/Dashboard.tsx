import { FC, useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLoading } from '../../redux/settingsSlice';
import { createBoard, getAllBoards } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Board>();

  const openBoard = (boardId: string) => {
    navigate(`/user/board/${boardId}`);
  };

  function boardData(board: Board) {
    createBoard(board).then((response) => {
      setBoards([...boards, response.data]);
    });
    reset();
  }

  useEffect(() => {
    dispatch(toggleLoading(true));
    getAllBoards().then((response) => {
      setBoards(response.data);
      dispatch(toggleLoading(false));
    });
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit(boardData)}>
        <div className="form-group">
          <label htmlFor="title">Board name</label>
          <input
            className="form-control"
            {...register('title', { required: true })}
            type="text"
            name="title"
            id="title"
          />
          {errors.title?.type === 'required' && <Alert variant="warning">Title is required</Alert>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Board description</label>
          <input
            className="form-control"
            {...register('description', { required: true })}
            type="text"
            name="description"
            id="description"
          />
          {errors.description?.type === 'required' && (
            <Alert variant="warning">Description is required</Alert>
          )}
        </div>
        <button type="submit" className="btn btn-success" disabled={!isValid}>
          Submit
        </button>
      </form>
      <div className="w-100 h-100 d-flex gap-5 overflow-auto ">
        {boards &&
          boards.map((board) => (
            <Card
              style={{ width: '300px', height: '400px', flex: '0 0 300px' }}
              key={board.id}
              onClick={() => openBoard(board.id!)}
            >
              <Card.Body>
                <Card.Title>{board.title}</Card.Title>
                <Card.Text>{board.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};
