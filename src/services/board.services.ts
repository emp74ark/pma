import { Board } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllBoards() {
  return http.get<Board[]>('/boards');
}

function getBoardById(id: string) {
  return http.get<Board>(`/boards/${id}`);
}

function createBoard(board: Board) {
  return http.post('/boards', {
    title: board.title,
    description: board.description,
  });
}

function deleteBoard(id: string) {
  return http.delete(`/boards/${id}`);
}

function editBoard(board: Board) {
  return http.put<Board>(`/boards/${board.id}`, {
    title: board.title,
    description: board.description,
  });
}

export { getAllBoards, getBoardById, createBoard, deleteBoard, editBoard };
