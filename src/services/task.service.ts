import axios from 'axios';
import { BASE_URL } from '../shared/environment';
import { Task } from '../shared/interfaces';

const token = localStorage.getItem('token');

function getAllTasks(boardId: string, columnId: string) {
  const response = axios.get<Task[]>(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function getTaskById(boardId: string, columnId: string, task: Task) {
  const response = axios.get<Task>(`${BASE_URL}/boards/${boardId}/${columnId}/${task.id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function createTask(boardId: string, columnId: string, userId: string, task: Task) {
  // TODO: save to store userId
  const response = axios.post(
    `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/`,
    { title: task.title, description: task.description, userId: userId },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

function deleteTask(boardId: string, columnId: string, task: Task) {
  const response = axios.delete(
    `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task.id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response;
}

function editTask(boardId: string, columnId: string, task: Task, userId: string) {
  const response = axios.put<Task>(
    `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task.id}`,
    {
      title: task.title,
      order: task.order,
      description: task.description,
      userId,
      boardId,
      columnId,
    },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

export { getAllTasks, getTaskById, createTask, deleteTask, editTask };
