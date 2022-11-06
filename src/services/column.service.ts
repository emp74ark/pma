import axios from 'axios';
import { BASE_URL } from '../shared/environment';
import { Column } from '../shared/interfaces';

const token = localStorage.getItem('token');

function getAllColums(boardId: string) {
  const response = axios.get<Column[]>(`${BASE_URL}/boards/${boardId}/columns`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

export { getAllColums };
