import { Task } from '../shared/interfaces';
import { http } from './interceptor.service';

function getAllTasks(boardId: string, columnId: string) {
  const response = http.get<Task[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  return response;
}

function getTaskById(boardId: string, columnId: string, task: Task) {
  const response = http.get<Task>(`/boards/${boardId}/${columnId}/${task.id}`);
  return response;
}

function createTask(task: Task) {
  const response = http.post<Task>(`/boards/${task.boardId}/columns/${task.columnId}/tasks`, {
    title: task.title,
    description: task.description,
    userId: task.userId,
  });
  return response;
}

function deleteTask(boardId: string, columnId: string, taskId: string) {
  const response = http.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  return response;
}

function editTask(task: Task) {
  const response = http.put<Task>(
    `/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`,
    {
      boardId: task.boardId,
      columnId: task.columnId,
      description: task.description,
      order: task.order,
      title: task.title,
      userId: task.userId,
    }
  );
  return response;
}

export { getAllTasks, getTaskById, createTask, deleteTask, editTask };
