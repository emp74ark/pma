import { Column } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllColums(boardId: string) {
  const response = http.get<Column[]>(`/boards/${boardId}/columns`);
  return response;
}

function getColumnById(boardId: string, columnId: string) {
  const response = http.get<Column>(`/boards/${boardId}/${columnId}`);
  return response;
}

function createColumn(boardId: string, title: string) {
  const response = http.post(`/boards/${boardId}/columns`, { title: title });
  return response;
}

function deleteColumn(column: Column) {
  const response = http.delete(`/boards/${column.boardId}/columns/${column.id}`);
  return response;
}

function editColumn(column: Column) {
  const response = http.put<Column>(`/boards/${column.boardId}/columns/${column.id}`, {
    title: column.title,
    order: column.order,
  });
  return response;
}

export { getAllColums, getColumnById, createColumn, deleteColumn, editColumn };
