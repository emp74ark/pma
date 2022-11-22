import { Task } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllTasks(boardId: string, columnId: string) {
  return http.get<Task[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
}

function getTaskById(boardId: string, columnId: string, taskId: string) {
  return http.get<Task>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
}

function createTask(task: Task) {
  return http.post<Task>(`/boards/${task.boardId}/columns/${task.columnId}/tasks`, {
    title: task.title,
    description: task.description,
    userId: task.userId,
  });
}

function deleteTask(task: Task) {
  return http.delete(`/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`);
}

function editTask(task: Task, data = task) {
  return http.put<Task>(`/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`, {
    boardId: data.boardId,
    columnId: data.columnId,
    description: data.description,
    order: data.order,
    title: data.title,
    userId: data.userId,
  });
}

export { getAllTasks, getTaskById, createTask, deleteTask, editTask };
