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

function getColumnById(boardId: string, columnId: string) {
  const response = axios.get<Column>(`${BASE_URL}/boards/${boardId}/${columnId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function createColumn(boardId: string, title: string) {
  const response = axios.post(
    `${BASE_URL}/boards/${boardId}/columns`,
    { title: title },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

function deleteColumn(boardId: string, columnId: string) {
  const response = axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function editColumn(boardId: string, column: Column) {
  const response = axios.put<Column>(
    `${BASE_URL}/boards`,
    { title: column.title, order: column.order },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

export { getAllColums, getColumnById, createColumn, deleteColumn, editColumn };
