import axios from 'axios';
import { BASE_URL } from '../shared/environment';
import { Board } from '../shared/interfaces';

const token = localStorage.getItem('token'); // TODO: move to interceptor

function getAllBoards() {
  const response = axios.get<Board[]>(`${BASE_URL}/boards`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function getBoardById(id: string) {
  const response = axios.get<Board>(`${BASE_URL}/boards/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function createBoard(board: Board) {
  const response = axios.post<Board>(
    `${BASE_URL}/boards`,
    { title: board.title, description: board.description },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

function deleteBoard(board: Board) {
  const response = axios.delete<Board>(`${BASE_URL}/boards/${board.id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function editBoard(board: Board) {
  const response = axios.put<Board>(
    `${BASE_URL}/boards`,
    { board },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

export { getAllBoards, getBoardById, createBoard, deleteBoard, editBoard };
