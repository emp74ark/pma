import { Board } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllBoards() {
  const response = http.get<Board[]>('/boards');
  return response;
}

function getBoardById(id: string) {
  const response = http.get<Board>(`/boards/${id}`);
  return response;
}

function createBoard(board: Board) {
  const response = http.post('/boards', {
    title: board.title,
    description: board.description,
  });
  return response;
}

function deleteBoard(board: Board) {
  const response = http.delete(`/boards/${board.id}`);
  return response;
}

function editBoard(board: Board) {
  const response = http.put<Board>(`/boards`, { board });
  return response;
}

export { getAllBoards, getBoardById, createBoard, deleteBoard, editBoard };
