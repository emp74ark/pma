import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createBoard } from '../../services/board.services';
import { Board } from '../../shared/interfaces';

export const AddColumn: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Board>();

  function boardData(board: Board) {
    // createBoard(board).then((response) => {
    //   setBoards([...boards, response.data]);
    // });
    // reset();
    console.log(board);
  }

  return (
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
  );
};
