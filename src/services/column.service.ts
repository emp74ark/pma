import { Column } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllColumns(boardId: string) {
  return http.get<Column[]>(`/boards/${boardId}/columns`);
}

function getColumnById(boardId: string, columnId: string) {
  return http.get<Column>(`/boards/${boardId}/${columnId}`);
}

function createColumn(boardId: string, title: string) {
  return http.post(`/boards/${boardId}/columns`, { title: title });
}

function deleteColumn(column: Column) {
  return http.delete(`/boards/${column.boardId}/columns/${column.id}`);
}

function editColumn(column: Column) {
  return http.put<Column>(`/boards/${column.boardId}/columns/${column.id}`, {
    title: column.title,
    order: column.order,
  });
}

export { getAllColumns, getColumnById, createColumn, deleteColumn, editColumn };
